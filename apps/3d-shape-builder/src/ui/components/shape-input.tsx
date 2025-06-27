import { SHAPE_ARRAY, ShapeBuilderForm } from "@/common";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@repo/ui/index";
import React, { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

export const ShapeInput = () => {
  const { control } = useFormContext<ShapeBuilderForm>();

  return (
    <div>
      <FormField
        control={control}
        name="shape"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel>Shape</FormLabel>
            <FormControl>
              <ul className="flex flex-wrap">
                {SHAPE_ARRAY.map((shape) => (
                  <ShapeButton
                    key={shape}
                    selected={field.value === shape}
                    onClick={() => field.onChange(shape)}
                  >
                    {shape}
                  </ShapeButton>
                ))}
              </ul>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

const ShapeButton = ({
  children,
  selected,
  onClick,
}: PropsWithChildren & {
  selected: boolean;
  onClick: () => void;
}) => (
  <li>
    <Button
      type="button"
      variant={selected ? "default" : "outline"}
      onClick={onClick}
    >
      {children}
    </Button>
  </li>
);
