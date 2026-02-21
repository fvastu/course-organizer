import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import HomePage from "@/pages/HomePage";
import Dashboard from "@/pages/Dashboard";
import LessonDetail from "@/pages/LessonDetail";
import Curriculum from "@/pages/Curriculum";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/panoramica" component={Dashboard} />
      <Route path="/lesson/:id" component={LessonDetail} />
      <Route path="/curriculum" component={Curriculum} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <Router />
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
