import * as Blockly from "blockly/core";
import { useCallback, useEffect } from "react";
import { useYjs } from "./useYjs";
import { Transaction, YMapEvent } from "yjs";
import { Variable } from "@/lib/types/yjs/variables";
import { useGeckodeStore } from "@/stores/geckodeStore";

export const useVariableSync = (
  documentName: string,
) => {
  const { blocklyWorkspace } = useGeckodeStore();
  const { doc, isSynced, onSynced } = useYjs(documentName);
  const variablesMap = doc.getMap<Variable>('variables');

  const blockEventsListener = useCallback((event: Blockly.Events.Abstract) => {
    if (!blocklyWorkspace) return;

    if (![
      Blockly.Events.VAR_CREATE,
      Blockly.Events.VAR_DELETE,
      Blockly.Events.VAR_RENAME,
    ].some(type => type === event.type)) {
      return;
    }

    console.log('variable event', event.toJson());

    if (event.type === Blockly.Events.VAR_CREATE) {
      const varEvent = event as Blockly.Events.VarCreate;
      const id = varEvent.varId;

      if (id) {
        doc.transact(() => {
          variablesMap.set(id, {
            name: varEvent.varName ?? '',
            type: varEvent.varType ?? '',
          });
        }, doc.clientID);
      }
    } else if (event.type === Blockly.Events.VAR_RENAME) {
      const varEvent = event as Blockly.Events.VarRename;
      const id = varEvent.varId;

      if (id) {
        const varData = variablesMap.get(id);

        if (varData) {
          const updates: (() => void)[] = [
            () => {
              variablesMap.set(id, {
                ...varData,
                ...{
                  name: varEvent.newName ?? '',
                }
              });
            }
          ];

          doc.transact(() => {
            updates.forEach((update) => update());
          }, doc.clientID);
        }
      }
    } else if (event.type === Blockly.Events.VAR_DELETE) {
      const id = (event as Blockly.Events.VarDelete).varId;

      if (id) {
        doc.transact(() => {
          variablesMap.delete(id);
        }, doc.clientID);

        // Delete the variable from all sprite workspaces (useBlockSync will handle the blocks)
        Object.entries(useGeckodeStore.getState().spriteWorkspaces).forEach(([id, workspace]) => {
          const variableMap = workspace.getVariableMap();
          const variable = variableMap.getVariableById(id);
          if (variable) variableMap.deleteVariable(variable);
        });
      }
    }
  }, [blocklyWorkspace]);

  const variablesMapObserver = useCallback((
    event: YMapEvent<Variable>,
    transaction: Transaction,
  ) => {
    if (!blocklyWorkspace) return;

    if (transaction.origin === doc.clientID) return; // Don't apply any events from self

    Blockly.Events.disable(); // Disable blockly events for remote changes

    const variableMap = blocklyWorkspace.getVariableMap();

    event.changes.keys.forEach((change, key) => {
      if (change.action === 'add') {
        const variableData = variablesMap.get(key);
        if (!variableData) return;

        try {
          variableMap.createVariable(
            variableData.name,
            variableData.type,
            key,
          );
        } catch {}
      } else if (change.action === 'update') {
        const variableData = variablesMap.get(key);
        if (!variableData) return;

        const variable = variableMap.getVariableById(key);
        if (!variable) return;
        variableMap.renameVariable(
          variable,
          variableData.name,
        );
      } else if (change.action === 'delete') {
        const variable = variableMap.getVariableById(key);
        if (!variable) return;
        variableMap.deleteVariable(variable);
      }
    });

    Blockly.Events.enable();

    // Refresh flyout so Variables category shows updated list on remote clients
    blocklyWorkspace.getToolbox()?.refreshSelection();
  }, [blocklyWorkspace]);

  useEffect(() => {
    if (!blocklyWorkspace) return;

    const handleSync = () => {
      // Load initial variables
      const variableMap = blocklyWorkspace.getVariableMap();
      variablesMap.forEach((variableData, key) => {
        try {
          variableMap.createVariable(
            variableData.name,
            variableData.type,
            key,
          );
        } catch {}
      });

      // Set up observers for future changes
      blocklyWorkspace.addChangeListener(blockEventsListener);
      variablesMap.observe(variablesMapObserver);

      return () => {
        blocklyWorkspace.removeChangeListener(blockEventsListener);
        variablesMap.unobserve(variablesMapObserver);
      };
    };

    // Register sync callback
    const cleanup = onSynced(handleSync);

    // If already synced, call immediately
    if (isSynced()) {
      const observerCleanup = handleSync();
      return () => {
        cleanup();
        observerCleanup?.();
      };
    }

    return cleanup;
  }, [blocklyWorkspace, doc, variablesMap, blockEventsListener, variablesMapObserver, onSynced, isSynced]);
};