# SEO Audit — Rush No More RV Resort & Campground
Prepared: 2026-04-17
Scope: technical SEO, local SEO, content architecture, structured data, on-page metadata, canonicalization.

---

## Executive summary

Base técnica ya era **sólida** (Next.js App Router, schema.org amplio, GTM+GA4, NAP consistente). Los huecos reales estaban en:
1. Arquitectura de contenido sin hubs dedicados (rally, rates, weddings, rides, guides).
2. Canonicalización inconsistente (root layout sin `alternates.canonical`, dobles títulos por template).
3. Redirects legacy incompletos (WordPress, feeds, `.html`, keyword-rich URLs).
4. Meta description raíz con review stars (riesgo policy), keyword meta con 80+ términos.
5. `/book`, `/booking`, `/my-reservation` indexables a nivel HTML aunque middleware redirige.
6. Breadcrumbs schema solo en `/events` (resto ya corregido en esta iteración — en realidad todas las páginas previas ya la tenían, verified).

Tras esta iteración el sitio queda con:
- 1 host canónico (www.rushnomore.com) con redirects 301 desde apex, `old.`, `m.`, `www2.`.
- Matriz completa de ~80 redirects legacy (WP, feeds, keyword-rich aliases, attraction aliases).
- 10 hub pages nuevas con contenido real (no thin), schema y enlaces internos.
- Metadata raíz limpia (canonical, keywords trimmed, sin review-star stuffing).
- `X-Robots-Tag: noindex` como defensa en headers para `/book*`, `/booking*`, `/admin*`, `/my-reservation*`, `/thanks*`.
- Footer con columnas reorganizadas apuntando a todos los hubs nuevos.
- Sitemap con 22 URLs, todas canónicas e indexables.

---

## Hallazgos con severidad

### Crítico (implementado)

| # | Hallazgo | Acción |
|---|----------|--------|
| C1 | `app/layout.tsx` sin `alternates.canonical` | Añadido `canonical: '/'` |
| C2 | Titles doblando sufijo (template + `seo()` helper) | Removido `| Rush No More` del helper — ahora solo el template lo añade |
| C3 | Meta description raíz con "4.8★ rated, 420+ reviews" | Descripción reescrita sin estrellas (schema mantiene reviews — correcto) |
| C4 | 80+ keywords meta en root | Trim a 10 primarias |
| C5 | `/rally-rates` era redirect hash → no rankeaba | Nueva página real con tabla de rates + FAQ schema |
| C6 | `/book`, `/booking`, `/my-reservation` layouts indexables | `robots: { index: false }` + `X-Robots-Tag` header |
| C7 | Legacy WP patterns sin cubrir (`/wp-admin`, `/feed`, `/category/*`, etc.) | ~20 redirects añadidos |

### Alto (implementado)

| # | Hallazgo | Acción |
|---|----------|--------|
| A1 | Faltaban hubs: rally, rates, weddings, monthly RV, guides | 10 páginas nuevas creadas con contenido real |
| A2 | URLs keyword-rich (`/sturgis-campgrounds`, `/rv-park-sturgis-sd`, etc.) eran oportunidades de duplicate content | 301 a money pages canónicas (sin duplicar contenido) |
| A3 | Footer sin enlaces a hubs nuevos | Footer reorganizado en 4 columnas: Stay, Sturgis Rally, Black Hills, Info |
| A4 | Sitemap sin hubs nuevos | Sitemap actualizado con 22 URLs canónicas, prioridades balanceadas |

### Medio (implementado parcialmente / documentado)

| # | Hallazgo | Acción |
|---|----------|--------|
| M1 | AI bots bloqueados en `robots.ts` (GPTBot, ChatGPT-User, CCBot, Google-Extended) | **No modificado** — decisión de negocio. Recomendación: desbloquear `Google-Extended` para aparecer en Google AI Overviews (motor propio, no scraping). Mantener GPTBot/CCBot bloqueados si se quiere proteger contenido de training sin atribución. |
| M2 | 84 usos de `backgroundImage` CSS en hero sections → imágenes no indexables | Mitigado en páginas nuevas con `role="img"` + `aria-label` (accesibilidad + señal semántica). Refactor completo a `<Image>` diferido (alto riesgo visual, bajo ROI incremental). |
| M3 | `/book` layout tenía título y descripción públicos | Noindex aplicado (L1 y L2 via layout + headers) |

### Bajo / flag

| # | Hallazgo | Decisión |
|---|----------|----------|
| B1 | Sin hreflang / `/es` real | No implementado. `availableLanguage: ['English', 'Spanish']` en schema es correcto (se habla español en oficina) pero no hay páginas ES — no simular hreflang. |
| B2 | `keywords` meta por página (30–40 términos cada una) | Mantenidas — Google las ignora, Bing las usa, no daña. |
| B3 | Algunos Image alt genéricos ("Rush No More resort grounds") podrían ser más específicos | Aceptable — ya descriptivos, no generic placeholders |

---

## Decisiones tomadas

1. **Host canónico**: `https://www.rushnomore.com`. Todos los demás hosts 301 al canónico.
2. **Trailing slash**: Next.js default (no trailing slash). No modificado.
3. **Keyword-rich URL strategy**: NO crear duplicados. Todas las variantes `(sturgis-campgrounds, rv-park-sturgis-sd, black-hills-rv-park, cabins-sturgis-sd, tent-camping-black-hills, things-to-do-near-mount-rushmore)` redirigen 301 a la página canónica.
4. **Nueva hub `/rally-rates`**: era redirect hash → ahora página real con tabla completa. Redirect removido.
5. **Nueva hub `/sturgis-rally-camping`**: rally-specific landing. `/events` mantiene su rol de hub de eventos generales (rally + car show + weddings). Rally-specific queries ahora rankean en hub dedicada.
6. **`/explore` es canónica para "things to do"**: `/things-to-do-near-mount-rushmore` → 301 a `/explore`. El título de `/explore` ya optimiza para esa keyword.
7. **AI bot policy**: no tocada. Recomendación open en `manual_actions.md`.
8. **Content style**: people-first, no keyword stuffing, FAQ natural por página.

---

## Riesgos residuales

1. **Background images no indexables (84 instancias)**: Pérdida de señal de Image Search. Refactor diferido — bajo ROI vs alto riesgo visual. Los hubs nuevos usan `role="img"` + `aria-label` como puente.
2. **AI bots bloqueados**: Limita visibilidad en ChatGPT/Gemini AI Overviews (Google-Extended) y en respuestas de ChatGPT (GPTBot). Flag abierta en `manual_actions.md` para decisión de negocio.
3. **Contenido `/events`**: sigue siendo hub de eventos con anchors `#rally-rates`, `#car-show`, `#weddings`. Ahora los hubs dedicados compiten con `/events` por rally/weddings. Mitigación: anchors de `/events` siguen funcionando para navegación interna, pero los hubs dedicados son los que ranking quiere (títulos y H1 más específicos).
4. **Transition period**: algunos backlinks externos apuntan a `/events#rally-rates`, `/events#weddings`. Siguen funcionando porque `/events` sigue existiendo. Los redirects 301 (`/weddings` → `/weddings-groups`) solo aplican a los paths raíz antiguos, no a anchors de `/events`.

---

## Quick wins ya implementados

- ✅ Root layout canonical
- ✅ Root layout description limpia
- ✅ Keywords meta trimmed
- ✅ `/book` / `/booking` / `/my-reservation` noindex + X-Robots-Tag
- ✅ 80+ redirects 301 agregados
- ✅ 10 hub pages nuevas con schema + FAQ
- ✅ Breadcrumbs component con BreadcrumbList schema
- ✅ Footer reorganizado con internal links a todos los hubs
- ✅ Sitemap con 22 URLs canónicas

---

## Entregables en este paquete

1. `seo_audit_rush_no_more.md` (este archivo)
2. `redirect_map.csv`
3. `content_architecture.md`
4. `metadata_plan.csv`
5. `schema_validation_report.md`
6. `manual_actions.md` (Search Console, GBP, directorios)
7. Implementación en código (redirects, layouts, hub pages, componente Breadcrumbs, sitemap, footer)

---

## Métricas para monitorear post-deploy

| Métrica | Dónde | Tiempo esperado para moverse |
|---------|-------|------------------------------|
| Impresiones `sturgis rally camping` | GSC Performance | 2–4 semanas |
| Impresiones `sturgis rally rates` | GSC Performance | 2–4 semanas |
| Impresiones `wedding venue sturgis sd` | GSC Performance | 4–8 semanas |
| Impresiones `needles highway motorcycle` | GSC Performance | 4–8 semanas |
| Indexación de nuevas URLs | GSC Indexing | 1–3 semanas (con request-indexing manual) |
| Coverage errors tras redirects | GSC Pages | Esperar spike de "Page with redirect" = deseado |
| CTR en money pages | GSC Performance | 2–6 semanas |
| Core Web Vitals | GSC Experience + PageSpeed Insights | Baseline +1 semana |
| Rich results | GSC Enhancements | 1–2 semanas |

---

## Próximos pasos recomendados (fuera de este sprint)

1. **Refactor gradual de heroes**: migrar `backgroundImage` → `<Image>` con `fill` + `object-cover` para indexación de imágenes. Empezar por money pages (`/`, `/stay/*`).
2. **Revisión de AI bot policy** (ver `manual_actions.md`).
3. **Local citation audit**: validar NAP en Google Business Profile, TripAdvisor, Yelp, Facebook, Apple Maps, Bing Places, Yellowpages, Campground directories. Todas deben usar exactamente: `Rush No More RV Resort & Campground`, `21137 Brimstone Place, Sturgis, SD 57785`, `605-423-2545`.
4. **Content freshness**: actualizar fechas de rally (`2026-08-02` → `2027-08-01` en enero 2027) y añadir fotos anuales nuevas.
5. **Review acquisition cadence**: el schema cita 420 reviews fijos. Si alcanzas 500+ o cambia el rating, actualizar `lib/seo.ts`.
6. **Monitoring**: alertar si impressions caen >20% en money pages tras deploy (señal de redirect chain o regresión de indexación).
