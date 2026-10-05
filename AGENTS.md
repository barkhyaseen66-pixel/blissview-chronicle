<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the book landing page at `/`, with reusable ornaments and newsletter controls in `src/components`, so the single-page experience stays cohesive.
- Keep editable demo copy and unavailable retailer destinations in one client-safe book-content module; never present placeholder reviews as endorsements.
- Validate newsletter consent and email with the shared schema and save through a public server function into the private RLS-enabled subscription table; no visitor can read the list.
- Keep uploaded media in CDN asset pointers and generated portrait art as bundled imports; this preserves the original cover without shipping the wrap image.
