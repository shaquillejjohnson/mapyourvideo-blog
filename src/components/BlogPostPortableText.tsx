import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ReactNode } from "react";
import { urlFor } from "../lib/sanity";

/** Image block renderer — matches story-creator-pro BlogPostPortableText. */
export function PortableTextImage({ value }: { value: Record<string, unknown> }) {
  if (!value?.asset) return null;
  const asset = value.asset as Record<string, unknown>;
  const expandedUrl = typeof asset?.url === "string" ? asset.url : null;
  const refOrId = (asset?._ref ?? asset?._id ?? "")?.toString();
  const isGif = refOrId.includes("-gif-");
  const meta = asset?.metadata as { dimensions?: { width?: number; height?: number } } | undefined;
  const w = meta?.dimensions?.width ?? 0;
  const h = meta?.dimensions?.height ?? 0;
  const isVertical = h > w;
  let url: string;
  try {
    const builder = urlFor(value as SanityImageSource);
    if (isGif) {
      url = builder.url();
    } else if (isVertical) {
      url = builder.width(800).fit("max").auto("format").url();
    } else {
      url = builder.auto("format").url();
    }
  } catch {
    if (expandedUrl) url = expandedUrl;
    else return null;
  }
  const alignment = (value.alignment as string) ?? "center";
  const size = (value.size as string) ?? "medium";
  const maxWidthClass =
    size === "small" ? "max-w-[280px]" : size === "large" ? "max-w-[560px]" : "max-w-[420px]";
  const alignmentClass =
    alignment === "left"
      ? "md:float-left md:mr-4 md:ml-0"
      : alignment === "right"
        ? "md:float-right md:ml-4 md:mr-0"
        : "mx-auto";
  return (
    <figure
      className={`my-6 w-full ${maxWidthClass} ${alignmentClass} ${alignment !== "center" ? "md:w-auto" : ""}`}
    >
      <div className="relative w-full overflow-hidden rounded-xl">
        <img src={url} alt={(value.alt as string) || ""} className="block h-auto w-full object-contain" />
      </div>
      {value.caption ? (
        <figcaption
          className={`mt-2 text-xs text-muted-foreground ${alignment === "center" ? "text-center" : ""}`}
        >
          {String(value.caption)}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function getBlogPostPortableTextComponents() {
  return {
    block: {
      h1: ({ children }: { children?: ReactNode }) => (
        <h2 className="mt-8 font-display text-2xl font-semibold text-foreground first:mt-0">{children}</h2>
      ),
      h2: ({ children }: { children?: ReactNode }) => (
        <h2 className="mt-6 font-display text-xl font-semibold text-foreground">{children}</h2>
      ),
      h3: ({ children }: { children?: ReactNode }) => (
        <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{children}</h3>
      ),
      normal: ({ children }: { children?: ReactNode }) => (
        <p className="mt-3 font-body text-sm leading-relaxed text-foreground">{children}</p>
      ),
    },
    types: {
      image: PortableTextImage,
    },
    unknownType: ({ value }: { value: { _type?: string } }) =>
      value?._type === "image" ? <PortableTextImage value={value as Record<string, unknown>} /> : null,
    list: {
      bullet: ({ children }: { children?: ReactNode }) => (
        <ul className="mt-3 list-disc space-y-1 pl-6 font-body text-sm text-foreground">{children}</ul>
      ),
      number: ({ children }: { children?: ReactNode }) => (
        <ol className="mt-3 list-decimal space-y-1 pl-6 font-body text-sm text-foreground">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
      number: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
    },
    marks: {
      link: ({
        children,
        value,
      }: {
        children?: ReactNode;
        value?: { href?: string };
      }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:opacity-90"
        >
          {children}
        </a>
      ),
    },
  };
}
