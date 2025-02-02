import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@repo/ui";
import {
  BenderFormType,
  TO_CODE_CREATE_TEXT_NODE,
  TO_UI_SEND_TEXT_NODE,
} from "@/common";
import {
  LetterSpacingInput,
  CurveTypeInput,
  BendAmountInput,
  Preview,
} from ".";

export type FormProps = {
  message: TO_UI_SEND_TEXT_NODE;
};

export const Form = ({ message }: FormProps) => {
  const methods = useForm<BenderFormType>({
    defaultValues: { bendAmount: 20, curveType: "circle", letterSpacing: 1 },
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = (data: BenderFormType) => {
    const createMessage: TO_CODE_CREATE_TEXT_NODE = {
      type: "to-code-create-text-node",
      payload: [message, data],
    };
    parent.postMessage({ pluginMessage: createMessage }, "*");
  };

  return (
    <FormProvider {...methods}>
      <form className="flex p-1 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Preview message={message} />
        <div className="flex flex-col gap-6 w-[180px]">
          <CurveTypeInput />
          <BendAmountInput />
          <LetterSpacingInput />
          <div className="w-full gap-2 flex">
            <Button
              className="w-full"
              type="reset"
              variant="outline"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button className="w-full" type="submit">
              Apply
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
