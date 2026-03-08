'use client';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

interface props {
  children?: ReactElement;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  title?: string;
  optionsMapping?: Record<string, string | (() => void)>; // maps dropdown labels to urls
  bottomBuffer?: number; // positioning of dropdown compared to button
  rightBuffer?: number;
}

const DropDownButton = ({
  children,
  className,
  type,
  title,
  optionsMapping,
  bottomBuffer = 5,
  rightBuffer = 0,
}: props) => {
  const [showDD, setShowDD] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className='py-5'>
      <button ref={btnRef} onClick={() => setShowDD(!showDD)} className={className} type={type} title={title}>
        {children}
      </button>
      {showDD && (
        <div
          className='absolute min-w-36 z-10 bg-primary-green text-white rounded-lg border border-white/20 p-1'
          style={{
            top: btnRef.current?.getBoundingClientRect().bottom! + bottomBuffer,
            right: window.innerWidth - btnRef.current?.getBoundingClientRect().right! + rightBuffer,
          }} /*Position dropdown below button and is aligned on the right*/
        >
          {Object.entries(optionsMapping!).length > 0 && (
            <ul>
              {Object.entries(optionsMapping!).map(([label, action]) => (
                <li
                  key={label}
                  className='p-2 cursor-pointer rounded-lg hover:bg-white/20'
                  onClick={() =>
                    // either redirect user to string provided or trigger the function
                    typeof action === 'string' ? (window.location.href = action) : action()
                  }
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DropDownButton;
