export const StopIcon = ({
  size = 16,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <rect x="2" y="2" width="12" height="12" rx="1.5" />
  </svg>
);
