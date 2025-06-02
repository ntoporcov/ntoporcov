import Head from "next/head";
import { htmlElement, useDarkModeState } from "../hooks/darkMode";
import { useEffectOnce } from "react-use";
import SocialLinks from "./nav/SocialLinks";
import { useRouter } from "next/router";

function AppFrame({ Component, pageProps }) {
  const { isDarkMode } = useDarkModeState();
  const location = useRouter();
  const isLuna = location.pathname.startsWith("/luna");

  useEffectOnce(() => {
    if (isDarkMode && !isLuna) {
      htmlElement().classList.add("dark");
    }
  });

  if (isLuna) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <title>Nic Toporcov</title>
        <meta name="title" content="Nic Toporcov" />
        <meta name="description" content="Trying to keep things cool" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Nic Toporcov" />
        <meta property="og:description" content="Trying to keep things cool" />
        <meta property="og:image" content="/webcover.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ntoporcov.com" />
        <meta property="twitter:title" content="Nic Toporcov" />
        <meta
          property="twitter:description"
          content="Trying to keep things cool"
        />
        <meta property="twitter:image" content="/webcover.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SocialLinks />
      <Component {...pageProps} />
    </>
  );
}

export default AppFrame;
