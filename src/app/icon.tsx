import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b", // zinc-950 background
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "100px", // circular border
          border: "18px solid rgba(230, 193, 122, 0.25)", // amber-100/25 border
        }}
      >
        <svg
          width="320"
          height="320"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#E6C17A" // Gold accent color
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 35 80 V 20 H 58 C 70 20 70 48 58 48 H 35 H 62 C 74 48 74 80 62 80 H 35" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
