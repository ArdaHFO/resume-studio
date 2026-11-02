/** Escape user-provided text before inserting it into an HTML string. */
export function escapeHtml(value: string): string {
  const replacements: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (character) => replacements[character]);
}

/** Keep executable URL schemes out of generated HTML links. */
export function safeLinkUrl(value: string): string {
  const url = value.trim();
  if (!/^(?:https?:\/\/|mailto:|tel:)/i.test(url) || /[\s\\{}<>]/.test(url)) {
    return '#';
  }
  return url;
}

/** Escape text throughout the JSON CV data without changing its shape. */
export function escapeHtmlValues<T>(value: T): T {
  if (typeof value === 'string') return escapeHtml(value) as T;
  if (Array.isArray(value)) return value.map(escapeHtmlValues) as T;
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, escapeHtmlValues(item)])
    ) as T;
  }
  return value;
}
