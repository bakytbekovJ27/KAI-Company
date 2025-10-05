import { useState, useEffect } from "react";
import { Header } from "./pages/Header";
import { Hero } from "./pages/Hero";
import { Portfolio } from "./pages/Portfolio";
import { Calculator } from "./components/features/Calculator";
import { Reviews } from "./pages/Reviews";
import { ContactForm } from "./components/features/ContactForm";
import { Footer } from "./pages/Footer";
import { AdminPanel } from "./pages/AdminPanel";
import { LoginModal } from "./components/modal/LoginModal";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (
      savedTheme === "dark" ||
      (!savedTheme && systemPrefersDark)
    ) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    // Handle browser navigation
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Admin Panel Route
  if (currentRoute === '/admin') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <AdminPanel isDark={isDark} onThemeToggle={toggleTheme} onNavigateTo={navigateTo} />
        <Toaster />
      </div>
    );
  }

  // Main Landing Page
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        isDark={isDark} 
        onThemeToggle={toggleTheme} 
        onLoginClick={openLoginModal}
      />

      <main>
        <Hero />
        <Portfolio />
        <Calculator />
        <Reviews />
        <ContactForm />
      </main>

      <Footer />
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onNavigateTo={navigateTo}
      />
      
      <Toaster />
    </div>
  );
}