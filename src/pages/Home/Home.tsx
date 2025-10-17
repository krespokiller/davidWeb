import { useTranslation } from 'react-i18next';
import { ExperienceSection, Footer, InteractiveBackground, Header } from "@/components";

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-dark relative">
      <Header />
      <InteractiveBackground />
      <main className="container relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 md:px-4">
          <div className="container">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <div className="space-y-4 group cursor-default">
                <h1 className="text-5xl md:text-7xl font-light text-light tracking-tight">
                  {t('hero.name')}
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide group-hover:text-light transition-colors duration-300">
                  {t('hero.title')}
                </p>
              </div>
              <div className="flex justify-center pt-8">
                <button
                  className="btn-primary"
                  onClick={() => {
                    const element = document.getElementById('experience');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('hero.viewWork')}
                </button>
              </div>
            </div>
          </div>
        </section>

        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
}