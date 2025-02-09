import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@repo/ui";
import { ShapeBuilderForm } from "@/common";

export const ShapeOptionInputs = () => {
  const { control, watch } = useFormContext<ShapeBuilderForm>();
  const shape = watch("shape");

  switch (shape) {
    case "rectangle":
      return (
        <>
          <FormField
            control={control}
            name="option.width"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <input type="number" {...field} className="input" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="option.height"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <input type="number" {...field} className="input" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="option.length"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Length</FormLabel>
                <FormControl>
                  <input type="number" {...field} className="input" />
                </FormControl>
              </FormItem>
            )}
          />
        </>
      );
    case "cylinder":
      return (
        <>
          <FormField
            control={control}
            name="option.radius"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Radius</FormLabel>
                <FormControl>
                  <input type="number" {...field} className="input" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="option.height"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <input type="number" {...field} className="input" />
                </FormControl>
              </FormItem>
            )}
          />
        </>
      );
    case "hexagonal-prism":
    case "pentagonal-prism":
      return (
        <>
          <FormField
            control={control}
            name="option.width"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <input type="number" {...field} className="input" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="option.height"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <input type="number" {...field} className="input" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="option.length"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Length</FormLabel>
                <FormControl>
                  <input type="number" {...field} className="input" />
                </FormControl>
              </FormItem>
            )}
          />
        </>
      );
    case "cube":
    case "pyramid":
      return <p>No additional options required for {shape}</p>;
    default:
      return null;
  }
};
