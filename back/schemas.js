import { z } from "zod";

const categorySchema = z.enum([
  "living",
  "shoppingBeauty",
  "medicalHealth",
  "food",
  "transport",
  "cultureLeisure",
  "unclassified",
  "salary",
  "otherIncome",
  "allowance",
]);
export const spendingDetailSchema = z.object({
  id: z.string(),
  year: z.number().int(),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  description: z.string().nonempty(),
  amount: z.number(),
  isExpenditure: z.boolean(),
  paymentMethod: z.string().optional(),
  category: categorySchema,
});

export const spendingDetailsSchema = z.array(spendingDetailSchema);
