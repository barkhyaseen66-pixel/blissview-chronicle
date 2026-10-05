import { createServerFn } from "@tanstack/react-start";
import { newsletterSchema } from "./newsletter-schema";

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => newsletterSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: false, message: "We couldn't save your signup. Please try again." };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("newsletter_subscriptions").insert({ email: data.email, consent: data.consent });
    if (error && error.code !== "23505") return { ok: false, message: "We couldn't save your signup. Please try again shortly." };
    return { ok: true, message: "You're on the list. Welcome to the Blissview community." };
  });