import { ImageResponse } from "next/og";
import { labelForAxes, parseAxes } from "@/lib/compass/score";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const axes = parseAxes(searchParams.get("e"), searchParams.get("a")) ?? { economic: 0, authority: 0 };
  const label = labelForAxes(axes.economic, axes.authority);
  const left = ((axes.economic + 1) / 2) * 100;
  const top = ((1 - axes.authority) / 2) * 100;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f6f7fb",
          color: "#1b2559",
          padding: "56px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 560 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#6d5efc" }}>SIBIC</div>
          <div style={{ marginTop: 18, fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>{label}</div>
          <div style={{ marginTop: 24, fontSize: 26, lineHeight: 1.35, color: "#64748b" }}>
            Este resultado es un punto de partida. No asigna un partido ni un candidato.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 480,
            height: 480,
            marginLeft: 40,
            borderRadius: 36,
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", width: 480, height: 480 }}>
            <div style={{ width: 240, height: 240, background: "#e5f6d8" }} />
            <div style={{ width: 240, height: 240, background: "#fff1c2" }} />
            <div style={{ width: 240, height: 240, background: "#f8d4d0" }} />
            <div style={{ width: 240, height: 240, background: "#d9e6ff" }} />
          </div>
          <div
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: 36,
              height: 36,
              marginLeft: -18,
              marginTop: -18,
              borderRadius: 18,
              background: "#6d5efc",
              border: "5px solid white",
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
