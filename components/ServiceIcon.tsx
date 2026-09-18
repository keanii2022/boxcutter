import type { ServiceIconName } from "../lib/content";

// Simple hand-drawn line icons, same idiom as BoxCutterLogo/Bridge — ink
// strokes for the main shape, one accent-coloured stroke per icon.
function WebsiteIcon() {
  return (
    <>
      <rect x="8" y="12" width="48" height="40" rx="4" className="service-icon__shape" />
      <line x1="8" y1="24" x2="56" y2="24" className="service-icon__shape" />
      <polyline points="16,44 26,34 34,40 48,22" className="service-icon__accent" />
      <polyline points="40,22 48,22 48,30" className="service-icon__accent" />
    </>
  );
}

function StartupIcon() {
  return (
    <>
      <line x1="32" y1="54" x2="32" y2="26" className="service-icon__shape" />
      <path d="M32 34C20 30 14 18 20 10C30 14 34 24 32 34Z" className="service-icon__shape" />
      <path d="M32 40C44 37 50 26 46 18C36 21 31 30 32 40Z" className="service-icon__accent" />
      <line x1="18" y1="54" x2="46" y2="54" className="service-icon__shape" />
    </>
  );
}

// Gear teeth computed at 8 even angles rather than freehand, so the shape
// stays symmetric.
const GEAR_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function CustomIcon() {
  return (
    <>
      <circle cx="32" cy="32" r="14" className="service-icon__shape" />
      <circle cx="32" cy="32" r="5" className="service-icon__accent" />
      {GEAR_ANGLES.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 32 + 14 * Math.cos(rad);
        const y1 = 32 + 14 * Math.sin(rad);
        const x2 = 32 + 20 * Math.cos(rad);
        const y2 = 32 + 20 * Math.sin(rad);
        return (
          <line
            key={deg}
            x1={x1.toFixed(2)}
            y1={y1.toFixed(2)}
            x2={x2.toFixed(2)}
            y2={y2.toFixed(2)}
            className="service-icon__shape"
          />
        );
      })}
    </>
  );
}

export default function ServiceIcon({ variant }: { variant: ServiceIconName }) {
  return (
    <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true">
      {variant === "website" && <WebsiteIcon />}
      {variant === "startup" && <StartupIcon />}
      {variant === "custom" && <CustomIcon />}
    </svg>
  );
}
