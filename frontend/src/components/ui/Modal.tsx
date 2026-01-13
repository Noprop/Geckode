"use client";

import { Icon, IconType } from "./Icon";
import { TrashIcon } from "@radix-ui/react-icons";
import { Share1Icon } from "@radix-ui/react-icons";

interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
  icon?: IconType;
  actions?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  onClose = () => {},
  icon,
  actions,
  className = '',
}) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline outline-white/10 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${className} bg-primary-green px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex sm:items-start`}>
            {icon && (
              <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/20 sm:mx-0 sm:h-10 sm:w-10">
                {<Icon icon={icon} size={25} className="color-white" />}
              </div>
            )}
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              {title && (
                <h3 className="text-base font-semibold text-white" id="modal-title">
                  {title}
                </h3>
              )}
              <div className="mt-2 text-sm text-gray-200">{children}</div>
            </div>
          </div>

          {actions && (
            <div className="bg-white dark:bg-dark-secondary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
};