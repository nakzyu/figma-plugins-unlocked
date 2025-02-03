import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  RadioGroup,
  RadioGroupItem,
  FormMessage,
} from "@repo/ui";
import React from "react";
import { BenderFormType } from "@/common";

export const CurveTypeInput = () => {
  const form = useFormContext<BenderFormType>();

  return (
    <FormField
      control={form.control}
      name="curveType"
      render={({ field }) => (
        <FormItem className="space-y-3 flex flex-col">
          <FormLabel>Curve Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="circle" />
                </FormControl>
                <FormLabel className="font-normal">Circle</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="wave" />
                </FormControl>
                <FormLabel className="font-normal">Wave</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
