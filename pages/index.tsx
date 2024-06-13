import { Skills } from "../components/home/Skills";
import Toy from "../components/home/Toy";
import SendGifSection from "../components/home/SendGifSection";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyBlob = dynamic(() => import("../components/home/Blob"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<></>}>
        <LazyBlob />
      </Suspense>
      <Skills />
      <SendGifSection />
    </>
  );
}
