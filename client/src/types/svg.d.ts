// React 컴포넌트로 변환된 SVG (?react)
declare module '*.svg?react' {
    import * as React from 'react';
    const C: React.FC<React.SVGProps<SVGSVGElement>>;
    export default C;
  }
  
  // 일반 SVG(파일 URL로 임포트할 때 대비)
  declare module '*.svg' {
    const src: string;
    export default src;
  }
  