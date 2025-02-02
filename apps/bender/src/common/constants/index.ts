import { z } from "zod";

export const schema = z.object({
  curveType: z.enum(["circle", "wave"]),
  bendAmount: z.number().min(-100).max(100),
  letterSpacing: z.number().min(0).max(10),
});

export type BenderFormType = z.infer<typeof schema>;
