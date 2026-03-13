'use client';

import { Modal } from '@/components/ui/modals/Modal';
import { InputBox, InputBoxRef } from '@/components/ui/inputs/InputBox';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useEffect, useRef, useState } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { Button } from '@/components/ui/Button';

type Mode = 'create' | 'rename';

interface Props {
  show: boolean;
  mode: Mode;
  spriteTypeId?: string | null;
  initialName?: string;
  onClose: () => void;
  onSuccess?: (spriteTypeId: string) => void;
}

const SpriteTypeModal = ({ show, mode, spriteTypeId, initialName = '', onClose, onSuccess }: Props) => {
  const showSnackbar = useSnackbar();
  const canEditProject = useGeckodeStore((state) => state.canEditProject);
  const spriteTypes = useGeckodeStore((state) => state.spriteTypes);
  const addSpriteType = useGeckodeStore((state) => state.addSpriteType);
  const renameSpriteType = useGeckodeStore((state) => state.renameSpriteType);

  const inputRef = useRef<InputBoxRef | null>(null);
  const [inputValue, setInputValue] = useState(initialName);

  useEffect(() => {
    if (!canEditProject) onClose();
  }, [canEditProject, onClose]);

  useEffect(() => {
    if (show) {
      const val = mode === 'rename' ? initialName : '';
      setInputValue(val);
      inputRef.current?.setInputValue(val);
      inputRef.current?.focus();
    }
  }, [show, mode, initialName]);

  if (!show) return null;

  const handleSubmit = () => {
    const trimmed = (inputRef.current?.inputValue ?? inputValue).trim();
    if (!trimmed) {
      showSnackbar('Please enter a sprite type name.', 'error');
      return;
    }
    if (spriteTypes.some((t) => t.name === trimmed && (mode !== 'rename' || t.id !== spriteTypeId))) {
      showSnackbar('A sprite type with that name already exists.', 'error');
      return;
    }

    try {
      if (mode === 'create') {
        const id = addSpriteType(trimmed);
        onClose();
        showSnackbar(`Sprite type "${trimmed}" created.`, 'success');
        onSuccess?.(id);
      } else if (spriteTypeId) {
        renameSpriteType(spriteTypeId, trimmed);
        onClose();
        showSnackbar(`Sprite type renamed to "${trimmed}".`, 'success');
      }
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Something went wrong.', 'error');
    }
  };

  return (
    <Modal
      onClose={onClose}
      title={mode === 'create' ? 'Create Sprite Type' : 'Rename Sprite Type'}
      icon={InfoCircledIcon}
      actions={
        <>
          <Button onClick={handleSubmit} className="btn-confirm ml-3">
            {mode === 'create' ? 'Create' : 'Rename'}
          </Button>
          <Button onClick={onClose} className="btn-neutral">
            Cancel
          </Button>
        </>
      }
    >
      {mode === 'create' ? 'Enter a name for the new sprite type:' : 'Enter a new name for this sprite type:'}
      <div className="flex flex-col">
        <InputBox
          ref={inputRef}
          defaultValue=""
          placeholder="Sprite type name"
          className="bg-white text-black my-3 border-0"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
      </div>
    </Modal>
  );
};

export default SpriteTypeModal;
