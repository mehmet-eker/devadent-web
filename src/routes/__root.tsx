import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const SITE_URL = "https://devadentmaras.com";
const LOGO_URL = `${SITE_URL}/favicon.png`;

// Google'ın işletme logosunu / zengin sonuçları göstermesi için Schema.org yapısal verisi
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Deva Dent Diş Kliniği",
  description:
    "Kahramanmaraş Dulkadiroğlu'nda kadın hekim önderliğinde modern diş kliniği. İmplant, estetik diş hekimliği, ortodonti ve daha fazlası.",
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  telephone: "+905331909146",
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: "İsa Divanlı, Sarayaltı Cd. No:51/A",
    addressLocality: "Dulkadiroğlu",
    addressRegion: "Kahramanmaraş",
    postalCode: "46080",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.5789666,
    longitude: 36.9324446,
  },
  hasMap: "https://maps.app.goo.gl/SgPUps1TCoSmrXhY9",
  sameAs: [
    "https://www.instagram.com/devadentdis/",
    "https://www.instagram.com/dt.ecemdereli/",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Deva Dent Diş Kliniği — Kahramanmaraş'ta Sıcak ve Güvenilir Diş Bakımı" },
      { name: "description", content: "Kahramanmaraş Dulkadiroğlu'nda kadın hekim önderliğinde modern diş kliniği. İmplant, estetik diş hekimliği, ortodonti ve daha fazlası. Hemen randevu alın." },
      { name: "author", content: "Deva Dent" },
      { property: "og:site_name", content: "Deva Dent Diş Kliniği" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: "Deva Dent Diş Kliniği — Gülüşünüze Deva" },
      { property: "og:description", content: "Kahramanmaraş'ın güvenilir diş kliniği. Sıcak bir ortam, deneyimli ekip, hassas bakım." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: LOGO_URL },
      { property: "og:image:width", content: "96" },
      { property: "og:image:height", content: "96" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Deva Dent Diş Kliniği — Gülüşünüze Deva" },
      { name: "twitter:description", content: "Kahramanmaraş'ın güvenilir diş kliniği. Sıcak bir ortam, deneyimli ekip, hassas bakım." },
      { name: "twitter:image", content: LOGO_URL },
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "canonical", href: SITE_URL },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
