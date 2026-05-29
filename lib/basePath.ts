/** Prepend this to every manually written public-asset path (img src, etc.)
 *  so the site works both locally (empty string) and on GitHub Pages
 *  (e.g. /nopo-webseite).
 *  Set via NEXT_PUBLIC_BASE_PATH in the build environment.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export default BASE_PATH;
