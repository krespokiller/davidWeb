import { Header, ExperienceSection, ContactSection, Footer } from "../components/organisms";

export function Home() {
  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="container">
        {/* Hero Section */}
        <section className="section animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-light leading-tight">
                Hi, I'm <span className="text-gradient">David Santiago Vargas</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Full Stack Developer passionate about creating beautiful, functional web applications
                with modern technologies and clean code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">View My Work</button>
                <button className="btn-secondary">Get In Touch</button>
              </div>
            </div>
            <div className="animate-bounce-in">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-72 h-72 bg-dark rounded-full flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
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
