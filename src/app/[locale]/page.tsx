import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { TechStack } from '@/components/sections/TechStack';
import { Projects } from '@/components/sections/Projects';
import { WorkTogether } from '@/components/sections/WorkTogether';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="home">
      <Hero />
      <TechStack />
      <Projects />
      <WorkTogether />
      <About />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
}
