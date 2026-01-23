export const CircleIcon = ({
  size = 16,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}
