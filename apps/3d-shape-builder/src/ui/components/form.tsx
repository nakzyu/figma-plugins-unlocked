import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button } from "@repo/ui";
import {
  SHAPE_BUILDER_FORM_DEFAULT_VALUES,
  ShapeBuilderForm,
  TO_CODE_CREATE_3D_SHAPE,
} from "@/common";

export const Form = () => {
  // 초기 defaultValues를 "cube"에 해당하는 값으로 설정합니다.
  const methods = useForm<ShapeBuilderForm>({
    defaultValues: SHAPE_BUILDER_FORM_DEFAULT_VALUES["cube"],
  });
  const { handleSubmit, reset, control } = methods;

  // useWatch를 이용하여 폼의 "shape" 필드의 값을 모니터링합니다.
  const shape = useWatch({
    control,
    name: "shape",
  });

  const resetDefaultBalueByShape = useCallback(
    () => reset(SHAPE_BUILDER_FORM_DEFAULT_VALUES[shape]),
    [reset, shape]
  );

  // shape 값이 변경되면, 해당 도형의 기본 옵션으로 폼 값을 재설정합니다.
  useEffect(() => {
    resetDefaultBalueByShape();
  }, [resetDefaultBalueByShape]);

  const onSubmit = (data: ShapeBuilderForm) => {
    const createMessage: TO_CODE_CREATE_3D_SHAPE = {
      type: "to-code-create-3d-shape",
      payload: data, // 혹은 필요한 방식으로 payload를 구성합니다.
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
              // Reset 시에도 현재 선택된 shape에 맞는 기본값으로 재설정합니다.
              onClick={() => resetDefaultBalueByShape()}
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
