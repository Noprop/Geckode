export function BaseIcon({ children, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 16 16"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      {children}
    </svg>
  );
}