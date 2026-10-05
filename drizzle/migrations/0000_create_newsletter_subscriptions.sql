CREATE TABLE public.newsletter_subscriptions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 email text NOT NULL UNIQUE CHECK (char_length(email) <= 254),
 consent boolean NOT NULL DEFAULT true CHECK (consent = true),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.newsletter_subscriptions TO service_role;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.newsletter_subscriptions IS 'Private Blissview newsletter opt-ins; managed by the publisher through Lovable Cloud.';