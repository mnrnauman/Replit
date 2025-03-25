import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFoundPage from "@/pages/NotFoundPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Solutions from "@/pages/solutions";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import Testimonials from "@/pages/testimonials";
import Contact from "@/pages/contact";
import BackToTop from "@/components/common/BackToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[#162237] text-[#D1D5DB]">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        <BackToTop />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
