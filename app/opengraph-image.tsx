import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#1b2559",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#c4b5fd" }}>SIBIC</div>
        <div
          style={{
            marginTop: 24,
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            color: "white",
          }}
        >
          Conoce. Compara. Decide.
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#cbd5e1", maxWidth: 860 }}>
          Información clara para conocer candidaturas y comparar propuestas.
        </div>
      </div>
    ),
    { ...size },
  );
}
