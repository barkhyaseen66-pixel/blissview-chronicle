import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, BookOpen, Heart, Users, Scale, Sparkles, Menu, X, Instagram, Facebook, Feather, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeartMark, Flourish } from "@/components/book-ornaments";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { book, characters, retailers, reviews } from "@/lib/book-content";
import cover from "@/assets/front-cover.jpg.asset.json";
import publisher from "@/assets/publisher-logo.jpg.asset.json";
import grain from "@/assets/cover-grain.jpg.asset.json";
import portraits from "@/assets/character-portraits.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: `${book.title} — Stephen Parks | Parker Publishers` },
      { name: "description", content: `${book.tagline} Discover ${book.title}, a novel by Stephen Parks about found family, love, and impossible choices.` },
      { property: "og:title", content: `${book.title} — Stephen Parks` },
      { property: "og:description", content: book.tagline },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const links = [{ text: "About", id: "about" }, { text: "Characters", id: "characters" }, { text: "Themes", id: "themes" }, { text: "Author", id: "author" }];
const themes = [
  { title: "Found Family", icon: Users, text: "Sometimes, the people you find become the family you need." },
  { title: "Love vs Duty", icon: Scale, text: "When the heart and responsibility pull in different directions." },
  { title: "Friendship & Humor", icon: Heart, text: "The laughter, loyalty, and little moments that make a life." },
  { title: "Heartbreak & Hope", icon: Sparkles, text: "Even in the hardest moments, there is a reason to believe." },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const review = reviews[reviewIndex];

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll(); window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add("reveal-pending");
      observer.observe(element);
    });
    return () => { window.removeEventListener("scroll", scroll); observer.disconnect(); };
  }, []);

  function unavailable(name: string) { setNotice(`${name} link is a placeholder. The publisher's official link will be added here.`); }

  return <div className="book-site">
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="paper-grain" aria-hidden="true"><img src={grain.url} alt="" /></div>
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner"><a href="#home" className="brand" aria-label="Lust and Love — home"><HeartMark /><span>Lust <i>&</i> Love</span></a>
        <nav aria-label="Main navigation" className={`navigation ${menuOpen ? "open" : ""}`}>
          {links.map(link => <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)}>{link.text}</a>)}
          <Button asChild variant="outline" className="nav-buy"><a href="#get-the-book" onClick={() => setMenuOpen(false)}>Get the Book <ArrowRight /></a></Button>
        </nav>
        <Button variant="ghost" size="icon" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
    </header>

    <main id="main">
      <section className="hero" id="home" aria-labelledby="book-title">
        <div className="hero-backdrop" aria-hidden="true"><img src={cover.url} alt="" /></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span /> A novel by Stephen Parks</p>
            <h1 id="book-title"><span>Lust and Love</span><span className="title-small">and the</span><span>Difference Of</span></h1>
            <Flourish className="hero-flourish" />
            <p className="hero-tagline">Some places become memories.<br /><em>Blissview University becomes home.</em></p>
            <p className="hero-description">A story of found family, impossible choices,<br className="desktop-break" /> and the quiet courage of opening your heart.</p>
            <div className="hero-actions"><Button asChild className="book-button"><a href="#get-the-book"><BookOpen /> Buy the Book</a></Button><Button asChild variant="outline" className="book-button secondary-button"><a href="#about">Read the Story <ArrowRight /></a></Button></div>
            <p className="publisher-line">Published by <span>Parker Publishers</span></p>
          </div>
          <div className="hero-book"><div className="book-object"><img src={cover.url} alt="Front cover of Lust and Love and the Difference Of by Stephen Parks, featuring an ink drawing of a couple beneath a street lamp" width={889} height={1382} fetchPriority="high" /><div className="book-pages" aria-hidden="true" /></div><div className="book-caption"><span>A little kindness. A lasting connection.</span><HeartMark /></div></div>
        </div>
        <a href="#about" className="scroll-cue" aria-label="Discover the story"><span>Discover the story</span><ArrowDown size={15} /></a>
      </section>

      <div className="parchment-band"><p>“Sometimes family isn't something you're born into.<br className="desktop-break" /> <em>Sometimes it's something you find.</em>”</p><HeartMark /></div>

      <section id="about" className="section about-section" aria-labelledby="about-heading">
        <div className="section-heading reveal"><p className="eyebrow">Welcome to Blissview</p><h2 id="about-heading">More than a love story</h2><Flourish /></div>
        <div className="blurb-frame reveal"><span className="frame-corner top-left" aria-hidden="true">❦</span><span className="frame-corner top-right" aria-hidden="true">❦</span><HeartMark className="blurb-heart" />
          {book.blurb.map((paragraph, index) => <div key={index}><p className={index === 0 ? "dropcap" : ""}>{paragraph}</p>{index < 2 && <div className="diamond-divider" aria-hidden="true"><span />◇<span /></div>}</div>)}
          <span className="frame-corner bottom-left" aria-hidden="true">❦</span><span className="frame-corner bottom-right" aria-hidden="true">❦</span>
        </div>
        <p className="section-footnote">Friendships that stay. Choices that matter. A place that feels like home.</p>
      </section>

      <section id="characters" className="section characters-section" aria-labelledby="characters-heading"><div className="section-heading reveal"><p className="eyebrow">The hearts of the story</p><h2 id="characters-heading">Meet the characters</h2><Flourish /></div>
        <div className="character-grid">{characters.map((character, index) => <article key={character.name} className="character-card reveal"><div className={`portrait ${character.portrait}`}><img src={portraits} alt={`Illustrative placeholder ink portrait of ${character.name}`} width={1536} height={1024} loading="lazy" /><span className="portrait-label">Illustrative portrait</span></div><div className="character-copy"><span className="character-number">0{index + 1}</span><p className="eyebrow">{character.label}</p><h3>{character.name}</h3><p>{character.description}</p><span className="placeholder-note">Character description · draft</span></div></article>)}</div>
      </section>

      <section id="themes" className="section themes-section" aria-labelledby="themes-heading"><div className="section-heading reveal"><p className="eyebrow">Between the pages</p><h2 id="themes-heading">The things that make us human</h2><Flourish /></div><div className="theme-grid">{themes.map(theme => <article className="theme-card reveal" key={theme.title}><theme.icon strokeWidth={1} aria-hidden="true" /><h3>{theme.title}</h3><p>{theme.text}</p></article>)}</div></section>

      <section className="details-section" aria-labelledby="details-heading"><div className="details-inner reveal"><div className="details-title"><BookOpen strokeWidth={1} /><p className="eyebrow">The edition</p><h2 id="details-heading">A story to keep</h2><div className="barcode" aria-label="ISBN 978-1-963452-08-7"><div aria-hidden="true" /><span>9 781963 452087</span></div></div><dl className="book-details"><div><dt>Title</dt><dd>{book.title}</dd></div><div><dt>Author</dt><dd>{book.author}</dd></div><div><dt>Publisher</dt><dd>{book.publisher}</dd></div><div><dt>Genre</dt><dd>Contemporary Romance / Campus Fiction</dd></div><div><dt>Format</dt><dd>To be confirmed</dd></div><div><dt>ISBN</dt><dd>{book.isbn}</dd></div></dl></div></section>

      <section className="section reviews-section" aria-labelledby="reviews-heading"><div className="section-heading reveal"><p className="eyebrow">From the reading room</p><h2 id="reviews-heading">Words that stay with you</h2></div><div className="review-carousel reveal" aria-roledescription="carousel" aria-label="Reader reviews"><span className="quotation-mark" aria-hidden="true">“</span>{review && <div key={reviewIndex} className="review-content" aria-live="polite"><p className="placeholder-note">{review.label}</p><blockquote>{review.quote}</blockquote><p className="review-attribution">— {review.attribution}</p></div>}<div className="review-controls"><Button variant="ghost" size="icon" aria-label="Previous review" onClick={() => setReviewIndex((reviewIndex + reviews.length - 1) % reviews.length)}><ArrowLeft /></Button><div className="review-dots">{reviews.map((_, index) => <Button key={index} variant="ghost" className={`review-dot ${reviewIndex === index ? "active" : ""}`} aria-label={`Show review ${index + 1}`} aria-pressed={reviewIndex === index} onClick={() => setReviewIndex(index)}><span /></Button>)}</div><Button variant="ghost" size="icon" aria-label="Next review" onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)}><ArrowRight /></Button></div></div></section>

      <section id="author" className="section author-section" aria-labelledby="author-heading"><div className="author-inner reveal"><div className="author-placeholder"><Feather strokeWidth={0.6} aria-hidden="true" /><span>Author portrait forthcoming</span></div><div className="author-copy"><p className="eyebrow">The voice behind Blissview</p><h2 id="author-heading">Stephen Parks</h2><Flourish /><p className="author-intro">Author of <em>Lust and Love and the Difference Of.</em></p><p className="author-bio">An introduction to the person behind the story belongs here. Add Stephen's approved biography, writing journey, and the inspiration behind Blissview University.</p><span className="placeholder-note">Author biography · placeholder</span><p className="author-signature" aria-hidden="true">Stephen Parks</p></div></div></section>

      <section id="get-the-book" className="section get-book-section" aria-labelledby="get-book-heading"><div className="section-heading reveal"><HeartMark className="closing-heart" /><p className="eyebrow">Your next chapter begins here</p><h2 id="get-book-heading">Find your way to Blissview</h2><p className="closing-tagline">Some stories don't just stay on the page.<br /><em>They find a place in your heart.</em></p></div><div className="retailer-buttons reveal">{retailers.map(retailer => retailer.url ? <Button asChild key={retailer.name} className="book-button"><a href={retailer.url} target="_blank" rel="noopener noreferrer">{retailer.name}<ExternalLink /></a></Button> : <Button key={retailer.name} variant="outline" className="book-button retailer-button" onClick={() => unavailable(retailer.name)}>{retailer.name}<ArrowRight /></Button>)}</div><p className="retailer-note">Retailer links · placeholders pending publication</p><div className="newsletter-wrap reveal"><NewsletterSignup /></div></section>
    </main>
    <footer className="site-footer"><div className="footer-top"><a href="#home" className="publisher-logo" aria-label="Parker Publishers — back to top"><img src={publisher.url} alt="Parker Publishers" width={265} height={90} loading="lazy" /></a><p>Stories that bring us together.</p><div className="social-links"><Button size="icon" variant="ghost" aria-label="Instagram — placeholder link" title="Instagram — placeholder link" onClick={() => unavailable("Instagram")}><Instagram /></Button><Button size="icon" variant="ghost" aria-label="Facebook — placeholder link" title="Facebook — placeholder link" onClick={() => unavailable("Facebook")}><Facebook /></Button><Button size="icon" variant="ghost" aria-label="Publisher website — placeholder link" title="Publisher website — placeholder link" onClick={() => unavailable("Publisher website")}><BookOpen /></Button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Parker Publishers. All rights reserved.</span><span>ISBN {book.isbn}</span><a href="#home">Back to top ↑</a></div></footer>
    {notice && <div className="link-notice" role="status"><span>{notice}</span><Button variant="ghost" size="icon" aria-label="Dismiss message" onClick={() => setNotice("")}><X /></Button></div>}
  </div>;
}
