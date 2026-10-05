import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090b",
          gap: 28,
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64">
          <path
            d="M14 30 L6 12 L28 12 L34 30 Z M34 30 L36 12 L58 12 L50 30 Z"
            fill="#d4aa82"
          />
          <path d="M14 30 L50 30 L50 58 L14 58 Z" fill="#b5835a" />
          <path
            d="M14 30 L6 12 L28 12 L34 30 M34 30 L36 12 L58 12 L50 30 M14 30 L50 30 L50 58 L14 58 Z"
            fill="none"
            stroke="#6b4a2e"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M34 30 L41 37 L31 43 L43 51 L35 58"
            fill="none"
            stroke="#ff6a1f"
            strokeWidth={3.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#f4f2ef",
            letterSpacing: -1,
          }}
        >
          box
          <span style={{ color: "#ff6a1f" }}>Cutter</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a3a19c" }}>
          think outside the box
        </div>
      </div>
    ),
    size
  );
}
