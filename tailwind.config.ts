import type { Config } from "tailwindcss";
import { colors } from "./src/shared/styles/colors";
import { tokens } from "./src/shared/styles/tokens";
import { fontFamily, typography } from "./src/shared/styles/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: fontFamily.serif,
        sans: fontFamily.sans,
      },
      fontSize: {
        "serif-48": [
          typography.serif[48].fontSize,
          typography.serif[48].lineHeight,
        ],
        "serif-24": [
          typography.serif[24].fontSize,
          typography.serif[24].lineHeight,
        ],
        "serif-14": [
          typography.serif[14].fontSize,
          typography.serif[14].lineHeight,
        ],
        "semibold-16": [
          typography.semibold[16].fontSize,
          {
            lineHeight: typography.semibold[16].lineHeight,
            fontWeight: typography.semibold[16].fontWeight,
          },
        ],
        "semibold-14": [
          typography.semibold[14].fontSize,
          {
            lineHeight: typography.semibold[14].lineHeight,
            fontWeight: typography.semibold[14].fontWeight,
          },
        ],
        "semibold-12": [
          typography.semibold[12].fontSize,
          {
            lineHeight: typography.semibold[12].lineHeight,
            fontWeight: typography.semibold[12].fontWeight,
          },
        ],
        "light-16": [
          typography.light[16].fontSize,
          {
            lineHeight: typography.light[16].lineHeight,
            fontWeight: typography.light[16].fontWeight,
          },
        ],
        "light-14": [
          typography.light[14].fontSize,
          {
            lineHeight: typography.light[14].lineHeight,
            fontWeight: typography.light[14].fontWeight,
          },
        ],
        "light-12": [
          typography.light[12].fontSize,
          {
            lineHeight: typography.light[12].lineHeight,
            fontWeight: typography.light[12].fontWeight,
          },
        ],
      },
      colors: {
        grayscale: colors.grayscale,
        pastel: colors.pastel,

        neutral: {
          surface: {
            weak: tokens.neutral.surface.weak,
            DEFAULT: tokens.neutral.surface.default,
            point: tokens.neutral.surface.point,
          },
          text: {
            weak: tokens.neutral.text.weak,
            DEFAULT: tokens.neutral.text.default,
            "rev-default": tokens.neutral.text["rev-default"],
          },
          border: {
            DEFAULT: tokens.neutral.border.default,
          },
        },
        brand: {
          surface: {
            DEFAULT: tokens.brand.surface.default,
          },
          text: {
            income: tokens.brand.text.income,
            expense: tokens.brand.text.expense,
          },
        },
        danger: {
          surface: {
            DEFAULT: tokens.danger.surface.default,
          },
          text: {
            DEFAULT: tokens.danger.text.default,
            "rev-default": tokens.danger.text["rev-default"],
          },
          border: {
            DEFAULT: tokens.danger.border.default,
          },
        },
        colorchip: tokens.colorchip,
      },
    },
  },
  plugins: [],
};

export default config;
