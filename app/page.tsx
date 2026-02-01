import { Hero } from "@/components/Hero";
import { Demo } from "@/components/Demo";
import { Features } from "@/components/Features";
import { Installation } from "@/components/Installation";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Demo />
      <Features />
      <Installation />
      <Footer />
    </>
  );
}
