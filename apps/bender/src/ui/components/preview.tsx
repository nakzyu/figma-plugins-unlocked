// Preview.tsx

import React from "react";
import { useWatch } from "react-hook-form";
import { FormProps } from "./form";
import { BenderFormType, generateTextLayout, TextLayout } from "@/common";

export const Preview: React.FC<FormProps> = ({ message }) => {
  const { curveType, bendAmount, letterSpacing } = useWatch<BenderFormType>();

  // 공통 레이아웃 계산 함수 호출
  const layouts: TextLayout[] = generateTextLayout(message, {
    curveType,
    bendAmount,
    letterSpacing,
  });

  return (
    <div
      className="relative"
      style={{
        width: "300px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      {layouts.map((layout, index) => (
        <div
          key={index}
          style={{
            color: layout.style.color,
            fontFamily: layout.style.fontFamily,
            fontSize: layout.style.fontSize,
            fontStyle: layout.style.fontStyle,
            fontWeight: layout.style.fontWeight,
            lineHeight: layout.style.lineHeight,
            position: "absolute",
            top: "50%",
            left: "50%",
            // 각 문자 중심 기준 배치 (translate(-50%, -50%) 추가)
            transform: `translate(-50%, -50%) translate(${layout.x}px, ${layout.y}px) rotate(${layout.rotation}deg)`,
            whiteSpace: "nowrap",
          }}
        >
          {layout.char}
        </div>
      ))}
    </div>
  );
};
