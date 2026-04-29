const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

/**
 * Canonical site origin used by shared nav/footer links.
 * Override in deploy env with PUBLIC_SITE_ORIGIN for static/preview hosts.
 */
export const SITE_ORIGIN = trimTrailingSlash(
  import.meta.env.PUBLIC_SITE_ORIGIN || "https://creatorstoryboard.com"
);

/**
 * App origin used for authenticated links (signup/dashboard).
 * Defaults to SITE_ORIGIN so standalone static deploys still resolve.
 */
export const APP_ORIGIN = trimTrailingSlash(
  import.meta.env.PUBLIC_APP_ORIGIN || SITE_ORIGIN
);
