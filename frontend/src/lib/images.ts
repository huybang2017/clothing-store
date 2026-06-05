const API_UPLOADS_PREFIX = '/api/v1/uploads/files/';

export function resolveMediaUrl(url?: string | null): string | undefined {
  if (!url?.trim()) return undefined;
  const trimmed = url.trim();

  if (trimmed.startsWith('/api/v1/')) return trimmed;

  try {
    const parsed = new URL(trimmed);
    const path = `${parsed.pathname}${parsed.search}`;

    if (path.startsWith(API_UPLOADS_PREFIX)) return path;

    const uploadsIdx = path.indexOf('/uploads/files/');
    if (uploadsIdx >= 0) {
      return `/api/v1${path.slice(uploadsIdx)}`;
    }

    if (
      (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') &&
      parsed.port === '4000' &&
      path.startsWith('/api/v1/')
    ) {
      return path;
    }
  } catch {
    // keep relative / opaque URLs as-is
  }

  return trimmed;
}
