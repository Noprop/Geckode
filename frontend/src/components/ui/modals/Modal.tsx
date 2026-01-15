"use client";

import { Icon, IconType } from "../Icon";

interface ModalProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  text?: React.ReactNode;
  onClose?: () => void;
  icon?: IconType;
  actions?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  subtitle,
  text,
  onClose = undefined,
  icon,
  actions,
  className = '',
}) => {
  return (
    <>
      {onClose ? <>
        <div
          className="fixed inset-0 bg-gray-900/50 transition-opacity"
          onClick={onClose}
        />
      </> : null}

      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 text-center sm:items-center sm:p-0 backdrop-blur-xs bg-black/30">
        <div
          className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline outline-white/10 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {((icon || title || subtitle) &&
            <div className={`${className} bg-primary-green grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 p-6 pb-4`}>
              {icon && (
                <div className="flex items-center justify-center row-start-1 col-start-1">
                  <div className="mx-auto my-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/20">
                    <Icon icon={icon} size={24} className="text-white" />
                  </div>
                </div>
              )}

              <div className="flex flex-col justify-center">
                {title && (
                  <div className="flex items-center">
                    <span className="text-2xl font-semibold text-white">
                      {title}
                    </span>
                  </div>
                )}
                {subtitle && (
                  <div className="flex items-center">
                    <span className="text-md font-semibold text-white/80">
                      {subtitle}
                    </span>
                  </div>
                )}
              </div>

              {text && (
                <div className="row-start-2 col-start-2 flex items-center">
                  <span className="text-sm text-white">
                    {text}
                  </span>
                </div>
              )}
            </div>
          )}

          {children && (
            <div className="text-sm text-black dark:text-gray-200 p-4 bg-accent-green dark:bg-dark-tertiary">{children}</div>
          )}

          {actions && (
            <div className="bg-light-bg dark:bg-dark-secondary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
};