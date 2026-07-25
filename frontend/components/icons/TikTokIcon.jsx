// lucide-react has no TikTok icon (confirmed — there's an open, unresolved
// feature request on their GitHub for it). This is a small custom icon
// built to match Lucide's stroke-based visual style (same viewBox,
// strokeWidth, and prop shape) so it sits naturally next to Instagram,
// Twitter, and Facebook wherever those are used.
export default function TikTokIcon({ size = 24, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V2.5a5.5 5.5 0 0 0 5.5 5.5" />
    </svg>
  );
}
