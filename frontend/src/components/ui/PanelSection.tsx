"use client";

export interface PanelSectionProps {
  children: React.ReactNode;
  /** Optional section title (small-caps label above content) */
  title?: React.ReactNode;
  /** Background intensity: default = lighter, strong = slightly darker */
  variant?: "default" | "strong";
  className?: string;
}

const variantBg = {
  default: "bg-light-secondary/40 dark:bg-dark-secondary/40",
  strong: "bg-light-secondary/60 dark:bg-dark-secondary/60",
} as const;

export function PanelSection({
  children,
  title,
  variant = "default",
  className = "",
}: PanelSectionProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200/80 dark:border-white/10 p-4 ${variantBg[variant]}${className ? ` ${className}` : ""}`.trim()}
    >
      {title != null && (
        <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
      )}
      {children}
    </div>
  );
}
