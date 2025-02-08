import { z } from "zod";

const width = z.number();
const height = z.number();
const length = z.number();
const radius = z.number();

const cubeSchema = z.object({
  shape: z.literal("cube"),
});

const rectangleSchema = z.object({
  shape: z.literal("rectangle"),
  option: z.object({
    width,
    height,
    length,
  }),
});

const cylinderSchema = z.object({
  shape: z.literal("cylinder"),
  option: z.object({
    radius,
    height,
  }),
});

const pyramidSchema = z.object({
  shape: z.literal("pyramid"),
});

const hexagonalPrismSchema = z.object({
  shape: z.literal("hexagonal-prism"),
  option: z.object({
    width,
    height,
    length,
  }),
});

const pentagonalPrismSchema = z.object({
  shape: z.literal("pentagonal-prism"),
  option: z.object({
    width,
    height,
    length,
  }),
});

export const schema = z.discriminatedUnion("shape", [
  cubeSchema,
  rectangleSchema,
  cylinderSchema,
  pyramidSchema,
  hexagonalPrismSchema,
  pentagonalPrismSchema,
]);

export type ShapeBuilderForm = z.infer<typeof schema>;

export const SHAPE_BUILDER_FORM_DEFAULT_VALUES: ShapeBuilderForm = {
  shape: "cube",
};
