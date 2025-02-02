"use client";

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
import { BenderFormType } from "@/common";

export const LetterSpacingInput = () => {
  const form = useFormContext<BenderFormType>();

  return (
    <FormField
      control={form.control}
      name="letterSpacing"
      render={({ field }) => (
        <FormItem className="space-y-3 flex flex-col">
          <FormLabel>Letter Spacing</FormLabel>
          <FormControl>
            <Slider
              defaultValue={[field.value]}
              value={[field.value]}
              onValueChange={(vals) => {
                field.onChange(vals[0]);
              }}
              min={0}
              max={10}
              step={0.1}
            />
          </FormControl>
          <FormControl>
            <Input {...field} type="number" min={0} max={10} step={0.1} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
