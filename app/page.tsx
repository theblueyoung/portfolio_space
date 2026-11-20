import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { SelectedWorks } from "@/components/SelectedWorks";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <SelectedWorks />
      </main>
      <Footer />
    </>
  );
}
