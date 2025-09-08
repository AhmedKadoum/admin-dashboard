import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip interceptor for full URLs and Angular-specific paths
  if (
    req.url.startsWith('http') ||
    req.url.startsWith('./assets/') ||
    req.url.startsWith('./i18n/') ||
    req.url.startsWith('/api/') || // Already has /api prefix
    req.url.startsWith('/favicon.ico') ||
    req.url.startsWith('/manifest.webmanifest') ||
    req.url.startsWith('/ngsw.json') || // Service worker manifest
    req.url.startsWith('/sitemap.xml') ||
    req.url.startsWith('/robots.txt') ||
    req.url.startsWith('/.well-known/') // Web manifest and other well-known URLs
  ) {
    return next(req);
  }

  // Add base URL for API requests
  const apiReq = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
  });
  return next(apiReq);
};
