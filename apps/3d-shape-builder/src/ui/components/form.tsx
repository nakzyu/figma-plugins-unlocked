import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@repo/ui";
import {
  SHAPE_BUILDER_FORM_DEFAULT_VALUES,
  ShapeBuilderForm,
  TO_CODE_CREATE_3D_SHAPE,
} from "@/common";

export const Form = () => {
  const methods = useForm<ShapeBuilderForm>({
    defaultValues: SHAPE_BUILDER_FORM_DEFAULT_VALUES,
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = (data: ShapeBuilderForm) => {
    const createMessage: TO_CODE_CREATE_3D_SHAPE = {
      type: "to-code-create-3d-shape",
      payload: {},
    };
    parent.postMessage({ pluginMessage: createMessage }, "*");
  };

  return (
    <FormProvider {...methods}>
      <form className="flex p-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 w-[180px]">
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
