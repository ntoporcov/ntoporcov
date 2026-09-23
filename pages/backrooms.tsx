import dynamic from "next/dynamic";
import Head from "next/head";

const BackroomsGame = dynamic(
  () => import("../components/backrooms/BackroomsGame"),
  {
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0d0b05] text-[#f5e9bd]">
        Turning on the lights...
      </div>
    ),
    ssr: false,
  },
);

export default function BackroomsPage() {
  return (
    <>
      <Head>
        <title>Behind the Wallpaper | Nic Toporcov</title>
        <meta
          name="description"
          content="An alternative way through Nic Toporcov's portfolio. Explore projects, experience, and the person behind the pixels in a deterministic Backrooms world."
        />
      </Head>
      <BackroomsGame />
    </>
  );
}
