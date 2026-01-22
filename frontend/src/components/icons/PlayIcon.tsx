export const PlayIcon = ({
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
    <path d="M4 2.5a1 1 0 0 1 1.5-.85l9 5.5a1 1 0 0 1 0 1.7l-9 5.5A1 1 0 0 1 4 13.5v-11z" />
  </svg>
);
