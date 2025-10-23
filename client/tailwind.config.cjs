/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', 'ui-sans-serif', 'system-ui', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Inter', 'Segoe UI', 'Arial', 'sans-serif'],
        serif: ['ChosunNm', 'Chosunilbo_myungjo', 'Iowan Old Style', 'Times New Roman', 'serif'],
      },
      colors: {
        // --- Primitives ---
        'gs-50':  '#FFFFFF',
        'gs-100': '#FBFCFD',
        'gs-200': '#F1F4F8',
        'gs-300': '#777D84',
        'gs-400': '#000000',

        pastel: {
          almondFrost: '#A28B78',
          porsche:     '#E39D5D',
          chenin:      '#D7CA6B',
          caper:       '#AACD7E',
          cruise:      '#8CDFD3',
          onahau:      '#C5E0EB',
          glacier:     '#7DB7BF',
          seagull:     '#79B2CA',
          jordyBlue:   '#73A4D0',
          perano:      '#A7B9E9',
          perfume:     '#BDA6E1',
          lavenderPink:'#F0B0D3',
          amaranth:    '#E93B5A',
          chestnut:    '#C04646',
        },

        // --- Tokens ---
        'neutral-surface-weak':   '#FBFCFD',
        'neutral-surface':        '#FFFFFF',
        'neutral-surface-point':  '#F1F4F8',
        'neutral-text-weak':      '#777D84',
        'neutral-text':           '#000000',
        'neutral-text-rev':       '#FFFFFF',
        'neutral-border':         '#000000',

        'brand-surface':          '#FFFFFF',
        'brand-text-income':      '#79B2CA',
        'brand-text-expense':     '#C04646',
        'brand-accent':           '#7BA1C6', // 헤더 배경 컬러

        'danger-surface':         '#E93B5A',
        'danger-text':            '#E93B5A',
        'danger-text-rev':        '#FFFFFF',
        'danger-border':          '#E93B5A',

        // Category chips (10~120)
        'chip-10':  '#A28B78',
        'chip-20':  '#E39D5D',
        'chip-30':  '#D7CA6B',
        'chip-40':  '#AACD7E',
        'chip-50':  '#8CDFD3',
        'chip-60':  '#C5E0EB',
        'chip-70':  '#7DB7BF',
        'chip-80':  '#73A4D0',
        'chip-90':  '#A7B9E9',
        'chip-100': '#BDA6E1',
        'chip-110': '#F0B0D3',
        'chip-120': '#C04646',
      },
      boxShadow: {
        elevated: '0 8px 24px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
};
