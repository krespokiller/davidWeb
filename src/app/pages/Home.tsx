import { Header, ExperienceSection, ContactSection, Footer } from "../components/organisms";

export function Home() {
  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="container">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="container">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-light text-light tracking-tight">
                  David Santiago Vargas
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
                  Full Stack Developer
                </p>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
                Passionate about creating beautiful, functional web applications
                with modern technologies and clean code.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <button className="btn-primary">View My Work</button>
                <button className="btn-secondary">Get In Touch</button>
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
