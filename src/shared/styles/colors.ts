export const colors = {
  grayscale: {
    50: "#FFFFFF",
    100: "#BBCFD",
    200: "#F1F4F8",
    300: "#777D84",
    400: "#000000",
  },
  pastel: {
    almondFrost: "#A28878",
    porsche: "#E39D5D",
    chenin: "#D7CA6B",
    caper: "#AACD7E",
    cruise: "#BCDFD3",
    onahau: "#C5E0EB",
    glacier: "#7DB7BF",
    seagull: "#79B2CA",
    jordyBlue: "#73A4D0",
    perano: "#A7B9E9",
    perfume: "#BDA6E1",
    lavenderPink: "#F0B0D3",
    amaranth: "#E93B5A",
    chestnut: "#C04646",
  },
} as const;

export type ColorScale = typeof colors;
