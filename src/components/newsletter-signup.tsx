import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsletterSchema } from "@/lib/newsletter-schema";
import { subscribeToNewsletter } from "@/lib/newsletter.functions";

export function NewsletterSignup() {
  const subscribe = useServerFn(subscribeToNewsletter);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = newsletterSchema.safeParse({ email: form.get("email"), consent: form.get("consent") === "on", website: form.get("website") ?? "" });
    if (!parsed.success) { setStatus("error"); setMessage("Enter a valid email and agree to receive the newsletter."); return; }
    setStatus("sending"); setMessage("");
    try {
      const result = await subscribe({ data: parsed.data });
      setStatus(result.ok ? "success" : "error"); setMessage(result.message);
    } catch { setStatus("error"); setMessage("We couldn't save your signup. Please try again shortly."); }
  }

  return <div className="newsletter">
    <p className="eyebrow">A place to belong</p>
    <h3>Join the Blissview community</h3>
    <p>Be part of the story. Sign up for book news from Parker Publishers.</p>
    {status === "success" ? <p className="signup-message" role="status"><Check size={20} />{message}</p> : <form onSubmit={submit}>
      <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
      <div className="email-field"><input id="newsletter-email" type="email" name="email" placeholder="Your email address" autoComplete="email" maxLength={254} required disabled={status === "sending"} /><Button type="submit" className="newsletter-submit" disabled={status === "sending"} aria-label="Join the newsletter">{status === "sending" ? <LoaderCircle className="animate-spin" /> : <ArrowRight />}</Button></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="consent-label"><input type="checkbox" name="consent" required /> <span>I agree to receive the Parker Publishers newsletter.</span></label>
      {message && <p className="signup-error" role="alert">{message}</p>}
    </form>}
  </div>;
}