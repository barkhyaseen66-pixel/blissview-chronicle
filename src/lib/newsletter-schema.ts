import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(254),
  consent: z.literal(true),
  website: z.string().max(200).default(""),
});