export function LeaveIcon() {
  return (
    <>
      <rect
        x="2.5"
        y="4.5"
        width="12"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
      />
      <line
        x1="9.5"
        y1="12"
        x2="20.5"
        y2="12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="17.5,9.5 20.5,12 17.5,14.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  );
}
