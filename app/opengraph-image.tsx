import { ImageResponse } from "next/og";

export const alt = "Mindovo party games and premium jigsaw puzzles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#faf8f5",
          color: "#171717",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ background: "#2563eb", borderRadius: 999, height: 420, left: -80, opacity: 0.12, position: "absolute", top: -120, width: 420 }} />
        <div style={{ background: "#dc2626", borderRadius: 999, bottom: -150, height: 460, opacity: 0.1, position: "absolute", right: -80, width: 460 }} />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920, textAlign: "center" }}>
          <div style={{ color: "#ca8a04", fontSize: 28, fontWeight: 700, letterSpacing: 8, textTransform: "uppercase" }}>Mindovo</div>
          <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05, marginTop: 28 }}>Play. Think. Connect.</div>
          <div style={{ fontSize: 34, lineHeight: 1.3, marginTop: 30 }}>Premium party games and jigsaw puzzles for screen-free time together.</div>
        </div>
      </div>
    ),
    size,
  );
}
