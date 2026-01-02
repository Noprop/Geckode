import React, { useRef, useState } from "react";

export interface Tab {
  title: string | React.ReactElement;
  element: React.ReactElement;
}

interface Props {
  tabs: Array<Tab>;
  startTab?: number | "None";
}

const TabSystem = ({ tabs, startTab = 0 }: Props) => {
  const [openTab, setOpenTab] = useState<number | "None">(
    tabs.length > 0 ? startTab : "None"
  );

  return (
    <div className="flex-col w-full">
      <div className="flex w-full mb-2 gap-x-2">
        {tabs.map((t, idx) => (
          <button
            key={idx}
            className={
              "w-full py-2 rounded-lg mx-auto hover:bg-accent-green hover:shadow-md active:shadow-md active:text-dark-txt hover:text-light-txt cursor-pointer " +
              (openTab === idx ? "bg-primary-green" : "")
            }
            onClick={() => setOpenTab(idx)}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div className="bg-primary-green w-full h-0.5 mb-8"></div>
      {openTab !== "None" && tabs[openTab].element}
    </div>
  );
};

export default TabSystem;
