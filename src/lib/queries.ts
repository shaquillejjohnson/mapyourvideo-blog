export const BLOG_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  excerpt,
  "authorName": author->name
}`;

export const BLOG_POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  excerpt,
  body[] {
    ...,
    _type == "image" => {
      ...,
      "asset": asset->
    }
  },
  "authorName": author->name,
  "authorImage": author->image,
  cta { label, url }
}`;
