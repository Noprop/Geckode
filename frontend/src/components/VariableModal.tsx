import { Modal } from '@/components/ui/modals/Modal';
import { InputBox, InputBoxRef } from '@/components/ui/inputs/InputBox';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useEffect, useRef } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { Button } from '@/components/ui/Button';

interface Props {
  showVariableModal: boolean;
  setShowVariableModal: (show: boolean) => void;
}

const VariableModal = ({ showVariableModal, setShowVariableModal }: Props) => {
  const showSnackbar = useSnackbar();
  const canEditProject = useGeckodeStore((state) => state.canEditProject);
  const workspace = useGeckodeStore((state) => state.blocklyWorkspace);
  const variableInputRef = useRef<InputBoxRef | null>(null);

  const handleClose = () => {
    setShowVariableModal(false);
    const flyout = workspace?.getFlyout();
    if (flyout) flyout.autoClose = true;
  };

  useEffect(() => {
    if (!canEditProject) {
      handleClose();
    }
  }, [canEditProject]);

  useEffect(() => {
    if (showVariableModal) {
      variableInputRef.current?.focus();
    }
  }, [showVariableModal]);

  if (!showVariableModal) return null;

  const handleCreate = () => {
    if (!workspace || !variableInputRef.current) {
      showSnackbar('Something went wrong', 'error');
      return;
    }
    if (!variableInputRef.current.inputValue) {
      showSnackbar('Please input a variable name.');
      return;
    }
    if (
      workspace
        .getVariableMap()
        .getAllVariables()
        .some((variable) => variable.getName() == variableInputRef.current!.inputValue)
    ) {
      showSnackbar('A variable with that name already exists. Please enter another name.');
      return;
    }
    workspace.getVariableMap().createVariable(variableInputRef.current.inputValue);
    handleClose();
    showSnackbar(`Variable "${variableInputRef.current.inputValue}" successfully created!`, 'success');
  };

  return (
    <div>
      <Modal
        onClose={handleClose}
        title="Create Variable"
        icon={InfoCircledIcon}
        actions={
          <>
            <Button onClick={handleCreate} className="btn-confirm ml-3">
              Create
            </Button>
            <Button onClick={handleClose} className="btn-neutral">
              Cancel
            </Button>
          </>
        }
      >
        Please enter a name for your variable:
        <div className="flex flex-col">
          <InputBox
            ref={variableInputRef}
            placeholder="Variable name"
            className="bg-white text-black my-3 border-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreate();
              if (e.key === 'Escape') handleClose();
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default VariableModal;
