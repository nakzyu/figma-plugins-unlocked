import { z } from "zod";

export const schema = z.object({});

export type ShapeBuilderForm = z.infer<typeof schema>;

export const SHAPE_BUILDER_FORM_DEFAULT_VALUES: ShapeBuilderForm = {};
