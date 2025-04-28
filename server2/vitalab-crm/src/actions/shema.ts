import { z } from "zod";

export const safeDescriptionSchema = z.object({
  id: z.string(),
  text: z.string().optional().nullable(),
  otherNames: z.string().optional().nullable(),
  preparation: z.string().optional().nullable(),
  biomaterial: z.string().optional().nullable(),
  mid_code: z.string(),
});

export const addRelatedTestSchema = z.object({
  testId: z.string(),
  code: z.string(),
  title: z.string(),
  relatedTestId: z.string(),
});

export const removeRelatedTestSchema = z.object({
  id: z.number(),
});
