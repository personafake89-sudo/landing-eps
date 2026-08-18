const BASE = "https://epsemaq.com.pe";

export function cleanHtml(html: string): string {
  if (!html) return "";
  const h = html
    .replace(/<body[^>]*>/g, "")
    .replace(/<\/body>/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/on\w+="[^"]*"/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return h;
}

export function withBaseImages(html: string): string {
  return (html || "").replace(
    /(\s(?:src|href)=")\/(uploads\/[^"]+)"/g,
    `$1${BASE}/$2"`
  );
}