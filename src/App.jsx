import { Outlet } from 'react-router-dom';
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import { ThemeProvider } from './ThemeContext.jsx';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App;
