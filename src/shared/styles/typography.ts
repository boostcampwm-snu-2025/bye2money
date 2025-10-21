export const fontFamily = {
  serif: ["Joseon Ilbo Myeongjo", "serif"],
  sans: ["Pretendard", "sans-serif"],
};

export const typography = {
  serif: {
    48: {
      fontSize: "48px",
      lineHeight: "56px",
    },
    24: {
      fontSize: "24px",
      lineHeight: "32px",
    },
    14: {
      fontSize: "14px",
      lineHeight: "16px",
    },
  },
  semibold: {
    16: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "600",
    },
    14: {
      fontSize: "14px",
      lineHeight: "16px",
      fontWeight: "600",
    },
    12: {
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: "600",
    },
  },
  light: {
    16: {
      fontSize: "16px",
      lineHeight: "32px",
      fontWeight: "300",
    },
    14: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: "300",
    },
    12: {
      fontSize: "12px",
      lineHeight: "24px",
      fontWeight: "300",
    },
  },
} as const;

export type TypographyScale = typeof typography;
export type FontFamily = typeof fontFamily;
