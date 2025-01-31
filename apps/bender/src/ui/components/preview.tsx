import React from "react";
import { useFormContext } from "react-hook-form";
import { FormProps } from "./form";
import { BenderFormType } from "../constants";

export const Preview = ({ message }: FormProps) => {
  const {} = useFormContext<BenderFormType>();

  return <div style={message.payload.css}>{message.payload.text}</div>;
};
