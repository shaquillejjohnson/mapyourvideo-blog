import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useMemo } from "react";
import { getBlogPostPortableTextComponents, PortableTextImage } from "./BlogPostPortableText";

interface Props {
  body: unknown[] | null | undefined;
}

/** Same Portable Text rendering as story-creator-pro BlogPost.tsx (SSR to static HTML). */
export default function BlogPostBody({ body }: Props) {
  const components = useMemo(() => {
    const c = getBlogPostPortableTextComponents() as PortableTextComponents;
    (c.types as Record<string, unknown>).image = PortableTextImage;
    return c;
  }, []);

  if (!body?.length) return null;

  return (
    <div className="mt-8 flow-root prose prose-sm max-w-none prose-p:font-body prose-headings:font-display">
      <PortableText value={body} components={components} onMissingComponent={false} />
    </div>
  );
}
