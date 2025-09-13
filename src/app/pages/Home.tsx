import { Header, ExperienceSection, ContactSection, Footer } from "../components/organisms";

export function Home() {
  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main>
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
