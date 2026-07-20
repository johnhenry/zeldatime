import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Essay images default to a portrait aspect-ratio (see .markdown-doc img in
// styles.css) since most are box art. Genuinely landscape images (verified
// by actual pixel dimensions, not alt text) get the `landscape` class via
// this source-URL allowlist instead -- markdown itself has no per-image
// class syntax. Add new landscape images here as they're found.
const LANDSCAPE_IMAGE_SRCS = new Set([
  "https://assets.nintendo.com/image/upload/c_fill,w_1600/q_auto:best/f_auto/ncom/en_US/articles/2025/the-battle-begins-in-hyrule-warriors-age-of-imprisonment/2250x1266_HWAOI_Launch",
]);

export function MarkdownDoc({ source }: { source: string }) {
  return (
    <div className="markdown-doc">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ""}
              className={typeof src === "string" && LANDSCAPE_IMAGE_SRCS.has(src) ? "landscape" : undefined}
              loading="lazy"
            />
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
