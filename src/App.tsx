import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuroraBoutique from "./pages/projects/AuroraBoutique";
import NebulaStudios from "./pages/projects/NebulaStudios";
import PulseAnalytics from "./pages/projects/PulseAnalytics";
import AuroraBoutiqueDemo from "./pages/demos/AuroraBoutiqueDemo";
import NebulaStudiosDemo from "./pages/demos/NebulaStudiosDemo";
import PulseAnalyticsDemo from "./pages/demos/PulseAnalyticsDemo";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/aurora-boutique" element={<AuroraBoutique />} />
          <Route path="/projects/nebula-studios" element={<NebulaStudios />} />
          <Route path="/projects/pulse-analytics" element={<PulseAnalytics />} />
          <Route path="/demos/aurora-boutique" element={<AuroraBoutiqueDemo />} />
          <Route path="/demos/nebula-studios" element={<NebulaStudiosDemo />} />
          <Route path="/demos/pulse-analytics" element={<PulseAnalyticsDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;