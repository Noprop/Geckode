export function BaseIcon({ children, viewBox, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox={viewBox}
      fill="currentColor"
      stroke="none"
      {...props}
    >
      {children}
    </svg>
  );
}