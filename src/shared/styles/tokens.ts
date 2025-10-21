import { colors } from "./colors";

export const tokens = {
  neutral: {
    surface: {
      weak: colors.grayscale[100],
      default: colors.grayscale[50],
      point: colors.grayscale[200],
    },
    text: {
      weak: colors.grayscale[300],
      default: colors.grayscale[400],
      "rev-default": colors.grayscale[50],
    },
    border: {
      default: colors.grayscale[400],
    },
  },
  brand: {
    surface: {
      default: colors.grayscale[50],
    },
    text: {
      income: colors.pastel.seagull,
      expense: colors.pastel.chestnut,
    },
  },
  danger: {
    surface: {
      default: colors.pastel.amaranth,
    },
    text: {
      default: colors.pastel.amaranth,
      "rev-default": colors.grayscale[50],
    },
    border: {
      default: colors.pastel.amaranth,
    },
  },
  colorchip: {
    10: colors.pastel.almondFrost,
    20: colors.pastel.porsche,
    30: colors.pastel.chenin,
    40: colors.pastel.caper,
    50: colors.pastel.cruise,
    60: colors.pastel.onahau,
    70: colors.pastel.glacier,
    80: colors.pastel.jordyBlue,
    90: colors.pastel.perano,
    100: colors.pastel.perfume,
    110: colors.pastel.lavenderPink,
    120: colors.pastel.chestnut,
  },
} as const;

export type TokenScale = typeof tokens;
