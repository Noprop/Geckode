import * as Blockly from "blockly/core";
import { RefObject, useCallback, useEffect } from "react";
import { useYjs } from "./useYjs";
import { Block } from "@/lib/types/yjs/blocks";
import { BlocklyEditorRef } from "@/components/BlocklyEditor";
import { Transaction, YMapEvent } from "yjs";
import { Variable } from "@/lib/types/yjs/variables";

export const useVariableSync = (
  documentName: string,
  blocklyRef: RefObject<BlocklyEditorRef | null>,
) => {
  const { doc } = useYjs(documentName);
  const variablesMap = doc.getMap<Variable>('variables');
  const blocksMap = doc.getMap<Block>('blocks');

  const blockEventsListener = useCallback((event: Blockly.Events.Abstract) => {
    if (!blocklyRef.current) return;

    const workspace = blocklyRef.current.getWorkspace();
    if (!workspace) return;

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
          

          // Manually go fix the variable blocks in the blocks map
          workspace.getAllBlocks(false).forEach(block => {
            block.inputList.forEach(input => {
              input.fieldRow.forEach(field => {
                if (field instanceof Blockly.FieldVariable && field.getValue() === id) {
                  updates.push(() => {
                    const blockData = blocksMap.get(block.id);
                    if (!blockData) return;

                    blocksMap.set(
                      block.id,
                      {
                        ...blockData,
                        fields: {
                          ...blockData.fields,
                          ...{
                            VAR: {
                              ...blockData.fields?.VAR,
                              name: varEvent.newName ?? '',
                            }
                          }
                        }
                      }
                    );
                  });
                }
              });
            });
          });

          doc.transact(() => {
            updates.forEach((update) => update());
          }, doc.clientID);
        }
      }
    } else {
      const id = (event as Blockly.Events.VarDelete).varId;

      if (id) {
        doc.transact(() => {
          variablesMap.delete(id);
        }, doc.clientID);
      }
    }
  }, [blocklyRef]);

  const variablesMapObserver = useCallback((
    event: YMapEvent<Variable>,
    transaction: Transaction,
  ) => {
    if (!blocklyRef.current) return;

    const workspace = blocklyRef.current.getWorkspace();
    if (!workspace) return;

    if (transaction.origin === doc.clientID) return; // Don't apply any events from self

    Blockly.Events.disable(); // Disable blockly events for remote changes

    const variableMap = workspace.getVariableMap();

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
  }, [blocklyRef]);

  useEffect(() => {
    if (!blocklyRef.current) return;

    const workspace = blocklyRef.current.getWorkspace();
    if (!workspace) return;

    workspace.addChangeListener(blockEventsListener);
    variablesMap.observe(variablesMapObserver);

    return () => {
      workspace.removeChangeListener(blockEventsListener);
      variablesMap.unobserve(variablesMapObserver);
    };
  }, [blocklyRef]);
};