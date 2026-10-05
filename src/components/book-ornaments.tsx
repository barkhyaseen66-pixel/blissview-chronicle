export function HeartMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 50 76" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M25 37C19 31 8 25 8 16C8 5 21 4 25 14C29 4 42 5 42 16C42 25 31 31 25 37ZM25 37V69M14 52H36M25 1V7M9 0L12 7M41 0L38 7M1 9L6 12M49 9L44 12" /></svg>;
}

export function Flourish({ className = "" }: { className?: string }) {
  return <div className={`flourish ${className}`} aria-hidden="true"><span /><svg viewBox="0 0 70 35" fill="none" stroke="currentColor" strokeWidth="1"><path d="M35 31C34 19 13 16 17 7C20 0 32 4 35 17C38 4 50 0 53 7C57 16 36 19 35 31ZM35 17V0M24 27C9 26 1 14 9 10C15 7 18 15 13 17M46 27C61 26 69 14 61 10C55 7 52 15 57 17" /></svg><span /></div>;
}