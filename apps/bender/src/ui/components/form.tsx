import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@repo/ui";
import { BenderFormType, FigmaMessage } from "@/common";
import {
  LetterSpacingInput,
  CurveTypeInput,
  BendAmountInput,
  Preview,
} from ".";

export type FormProps = {
  message: FigmaMessage;
};

export const Form = ({ message }: FormProps) => {
  const methods = useForm<BenderFormType>({
    defaultValues: { bendAmount: 20, curveType: "circle", letterSpacing: 1 },
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form className="flex p-1 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Preview message={message} />
        <div className="flex flex-col gap-6">
          <CurveTypeInput />
          <BendAmountInput />
          <LetterSpacingInput />
          <div>
            <Button type="reset" variant="outline" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="submit">Apply</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
