import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SSRProviders, ClientProviders } from "@/providers/Providers";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
  const clientOnlyRoutes = ["/uploader", "/shard"]; // dynamic route prefix
  const isClientOnly = clientOnlyRoutes.some((route) =>
    router.pathname.startsWith(route)
  );

  const Providers = isClientOnly ? ClientProviders : SSRProviders;

  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
