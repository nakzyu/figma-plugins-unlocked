import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { BenderFormType } from "@/common/constants";
import { FormProps } from "./form";
import { TextLayout, generateTextLayout } from "@/common";

export const Preview: React.FC<FormProps> = ({ message }) => {
  const { curveType, bendAmount, letterSpacing } = useWatch<BenderFormType>();
  const [layouts, setLayouts] = useState<TextLayout[]>([]);

  console.log(bendAmount, letterSpacing);

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        const newLayouts = generateTextLayout(message, {
          curveType,
          bendAmount,
          letterSpacing,
        });
        setLayouts(newLayouts);
      });
    }
  }, [message, curveType, bendAmount, letterSpacing]);

  return (
    <div
      className="relative"
      style={{
        width: "400px",
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
