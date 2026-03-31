import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import TechStack from "./components/TechStack.jsx";
import Projects from "./components/Projects.jsx";
import Tools from "./components/Tools.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App;
