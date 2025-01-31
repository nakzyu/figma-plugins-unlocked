import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Preview } from "./preview";
import { BenderFormType } from "../constants";
import { FigmaMessage } from "@/code/messages";
import { CurveTypeInput } from "./curve-type-input";

export type FormProps = {
  message: FigmaMessage;
};

export const Form = ({ message }: FormProps) => {
  const methods = useForm<BenderFormType>();

  const { handleSubmit } = methods;
  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <Preview message={message} />
        <CurveTypeInput />
      </form>
    </FormProvider>
  );
};
