import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { BenderFormType } from "@/common/constants";
import { FormProps } from "./form";
import { TextLayout, generateTextLayout } from "@/common";

export const Preview: React.FC<FormProps> = ({ message }) => {
  const { watch } = useFormContext<BenderFormType>();
  const { curveType, bendAmount, letterSpacing } = watch();
  const [layouts, setLayouts] = useState<TextLayout[]>([]);

  useEffect(() => {
    const render = async () => {
      const fontDescriptor = `${message.payload.css["font-size"]} ${message.payload.css["font-family"]}`;
      const isFontLoaded = document.fonts.check(fontDescriptor);
      if (!isFontLoaded) await document.fonts.load(fontDescriptor);

      const newLayouts = generateTextLayout(
        message,
        {
          curveType,
          bendAmount,
          letterSpacing,
        },
        true
      );
      setLayouts(newLayouts);
    };

    render();
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
            color: layout.css.color,
            fontFamily: layout.css.fontFamily,
            fontSize: layout.css.fontSize,
            fontStyle: layout.css.fontStyle,
            fontWeight: layout.css.fontWeight,
            lineHeight: layout.css.lineHeight,
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
