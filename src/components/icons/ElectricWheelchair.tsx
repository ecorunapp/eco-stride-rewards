
import { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

// Custom icon for Electric Wheelchair
export const ElectricWheelchair: LucideIcon = forwardRef((props, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={ref}
      {...props}
    >
      <circle cx="8" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M9 19h5.5a3.5 3.5 0 0 0 0-7h-2.5" />
      <path d="M7 9.5V13h8.25" />
      <path d="M12 12v4" />
      <path d="m16 16-2-2" />
      <path d="M10 7.5V9" />
      <path d="m8 7 3-1.5h4.5l.5.5" />
      <path d="M13 7h1" />
      <path d="m7 6 1 1" />
      <path d="M20 8h-2v3" />
      <path d="M20 11h-2" />
    </svg>
  );
});

ElectricWheelchair.displayName = "ElectricWheelchair";

export default ElectricWheelchair;
