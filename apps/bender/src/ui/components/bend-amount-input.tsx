import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Slider,
  Input,
} from "@repo/ui";
import React from "react";
import { BenderFormType, onChangeWithMinMax } from "@/common";

const min = -100;
const max = 100;
export const BendAmountInput = () => {
  const form = useFormContext<BenderFormType>();

  return (
    <FormField
      control={form.control}
      name="bendAmount"
      render={({ field }) => (
        <FormItem className="space-y-3 flex flex-col">
          <FormLabel>Bend Amount</FormLabel>
          <FormControl>
            <Slider
              defaultValue={[field.value]}
              value={[field.value]}
              onValueChange={(vals) => {
                field.onChange(vals[0]);
              }}
              min={min}
              max={max}
              step={1}
            />
          </FormControl>
          <FormControl>
            <Input
              {...field}
              type="number"
              min={min}
              max={max}
              step={1}
              onChange={onChangeWithMinMax(field.onChange, min, max)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
