"use client";

import { useFormContext } from "react-hook-form";
import { BenderFormType } from "../constants";
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

export const CurveTypeInput = () => {
  const form = useFormContext<BenderFormType>();

  return (
    <FormField
      control={form.control}
      name="curveType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Notify me about...</FormLabel>
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
                <FormLabel className="font-normal">circle</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="wave" />
                </FormControl>
                <FormLabel className="font-normal">wave</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
