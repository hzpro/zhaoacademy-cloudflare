import { Hero } from "@/components/home/hero";
import { StatsBar } from "@/components/home/stats-bar";
import { AboutPreview } from "@/components/home/about-preview";
import { ServicesGrid } from "@/components/home/services-grid";
import { ArticlesPreview } from "@/components/home/articles-preview";
import { ContactCta } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutPreview />
      <ServicesGrid />
      <ArticlesPreview />
      <ContactCta />
    </>
  );
}
