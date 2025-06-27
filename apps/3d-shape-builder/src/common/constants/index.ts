import { z } from "zod";

export const SHAPE = {
  cube: "cube",
  rectangle: "rectangle",
  cylinder: "cylinder",
  pyramid: "pyramid",
  "hexagonal-prism": "hexagonal-prism",
  "pentagonal-prism": "pentagonal-prism",
} as const;

export const SHAPE_ARRAY = [...Object.values(SHAPE)] as const;

const width = z.number();
const height = z.number();
const length = z.number();
const radius = z.number();

const cubeSchema = z.object({
  shape: z.literal(SHAPE.cube),
});

const rectangleSchema = z.object({
  shape: z.literal(SHAPE.rectangle),
  option: z.object({
    width,
    height,
    length,
  }),
});

const cylinderSchema = z.object({
  shape: z.literal(SHAPE.cylinder),
  option: z.object({
    radius,
    height,
  }),
});

const pyramidSchema = z.object({
  shape: z.literal(SHAPE.pyramid),
});

const hexagonalPrismSchema = z.object({
  shape: z.literal(SHAPE["hexagonal-prism"]),
  option: z.object({
    width,
    height,
    length,
  }),
});

const pentagonalPrismSchema = z.object({
  shape: z.literal(SHAPE["pentagonal-prism"]),
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
export const SHAPE_BUILDER_FORM_DEFAULT_VALUES: Record<
  ShapeBuilderForm["shape"],
  ShapeBuilderForm
> = {
  cube: { shape: "cube" },
  rectangle: {
    shape: "rectangle",
    option: { width: 1, height: 1, length: 1 },
  },
  cylinder: {
    shape: "cylinder",
    option: { radius: 1, height: 1 },
  },
  pyramid: { shape: "pyramid" },
  "hexagonal-prism": {
    shape: "hexagonal-prism",
    option: { width: 1, height: 1, length: 1 },
  },
  "pentagonal-prism": {
    shape: "pentagonal-prism",
    option: { width: 1, height: 1, length: 1 },
  },
};
