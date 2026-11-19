const fallback = "#6d5efc";

function channels(hex: string) {
  const color = /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : fallback;
  const value = Number.parseInt(color.slice(1), 16);
  return { color, r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

export function lightenPartyColor(hex: string, amount = 0.42) {
  const { r, g, b } = channels(hex);
  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount);
  const part = (channel: number) => mix(channel).toString(16).padStart(2, "0");
  return `#${part(r)}${part(g)}${part(b)}`;
}

export function partyGradient(hex: string) {
  const { color } = channels(hex);
  return `linear-gradient(160deg, ${color} 0%, ${lightenPartyColor(color)} 100%)`;
}

const skip = /^(de|del|la|las|los|y|e)$/i;

export function partyInitials(party: string) {
  const words = party.split(/\s+/).filter(Boolean);
  const picked = words.filter((word) => !skip.test(word));
  const source = picked.length > 0 ? picked : words;
  return source
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
