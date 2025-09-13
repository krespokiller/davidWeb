import { ExperienceSection, ContactSection, Footer } from "../components/organisms";

export function Home() {
  return (
    <div className="min-h-screen bg-dark">
      <main className="container">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 md:px-4">
          <div className="container">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <div className="space-y-4 group cursor-default">
                <h1 className="text-5xl md:text-7xl font-light text-light tracking-tight">
                  David Santiago Vargas
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide group-hover:text-light transition-colors duration-300">
                  Software Engineer
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
                  View My Work
                </button>
              </div>
            </div>
          </div>
        </section>

        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
