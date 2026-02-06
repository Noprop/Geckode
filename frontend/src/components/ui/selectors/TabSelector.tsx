"use client";

import { Icon, IconType } from "../Icon";

interface TabSelectorProps<T> {
  tab: T;
  setTab: (tab: T) => void;
  options: Tab<T>[];
}

interface Tab<T> {
  value: T;
  label: string;
  icon: IconType;
}

export default function TabSelector<T extends string>({ tab, setTab, options }: TabSelectorProps<T>) {
  return (
    <div className={`inline-flex items-center gap-x-1 rounded-full bg-white/15 border border-white/20 p-1 shadow-sm`}>
      {options.map((option) => {
        const isActive = tab === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTab(option.value)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2
              text-sm font-semibold transition-all duration-200 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer ${
                isActive ? `bg-white text-[#3d8c5c] shadow-sm` : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
          >
            <Icon icon={option.icon} className={isActive ? `text-primary-green` : "text-white/80"} />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
