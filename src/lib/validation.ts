import * as z from "zod";
export const userSchema = z.object({
  phoneNumber: z.string(),
  smsCode: z.string()
})