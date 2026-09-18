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
          background: "#ffffff",
          gap: 28,
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64">
          <path
            d="M14 30 L6 12 L28 12 L34 30 M34 30 L36 12 L58 12 L50 30 M14 30 L50 30 L50 58 L14 58 Z"
            fill="none"
            stroke="#121212"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M34 30 L41 37 L31 43 L43 51 L35 58"
            fill="none"
            stroke="#d64200"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#121212",
            letterSpacing: -1,
          }}
        >
          box
          <span style={{ color: "#d64200" }}>Cutter</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#5a5a5a" }}>
          think outside the box
        </div>
      </div>
    ),
    size
  );
}
