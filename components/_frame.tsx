import Head from "next/head";
import { htmlElement, useDarkModeState } from "../hooks/darkMode";
import { useEffectOnce } from "react-use";
import SocialLinks from "./nav/SocialLinks";

function AppFrame({ Component, pageProps }) {
  const { isDarkMode } = useDarkModeState();

  useEffectOnce(() => {
    if (isDarkMode) {
      htmlElement().classList.add("dark");
    }
  });

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
