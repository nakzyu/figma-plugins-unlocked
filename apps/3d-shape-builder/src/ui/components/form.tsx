import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button } from "@repo/ui";
import {
  SHAPE_BUILDER_FORM_DEFAULT_VALUES,
  ShapeBuilderForm,
  TO_CODE_CREATE_3D_SHAPE,
} from "@/common";
import { ShapeOptionInputs } from "./shape-option-inputs";
import { ShapeInput } from "./shape-input";

export const Form = () => {
  const methods = useForm<ShapeBuilderForm>({
    defaultValues: SHAPE_BUILDER_FORM_DEFAULT_VALUES["cube"],
  });
  const { handleSubmit, reset, control } = methods;

  const shape = useWatch({
    control,
    name: "shape",
  });

  const resetDefaultValueByShape = useCallback(() => {
    reset(SHAPE_BUILDER_FORM_DEFAULT_VALUES[shape]);
  }, [reset, shape]);

  useEffect(() => {
    resetDefaultValueByShape();
  }, [resetDefaultValueByShape]);

  const onSubmit = (data: ShapeBuilderForm) => {
    const createMessage: TO_CODE_CREATE_3D_SHAPE = {
      type: "to-code-create-3d-shape",
      payload: data,
    };
    parent.postMessage({ pluginMessage: createMessage }, "*");
  };

  return (
    <FormProvider {...methods}>
      <form className="flex p-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 w-[180px]">
          <ShapeInput />
          <ShapeOptionInputs />
          <div className="w-full gap-2 flex">
            <Button
              className="w-full"
              type="reset"
              variant="outline"
              onClick={() => resetDefaultValueByShape()}
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
