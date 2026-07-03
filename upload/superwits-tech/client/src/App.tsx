import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CookieConsent from "./components/CookieConsent";
import { ServiceWorkerUpdateNotification } from "./components/ServiceWorkerUpdateNotification";
import { useAnalytics } from "./hooks/useAnalytics";

// Home is loaded eagerly — it is the critical above-the-fold route
import Home from "./pages/Home";

// All secondary pages are lazy-loaded — they are not needed for the initial paint
// This reduces the initial JS bundle by ~128 KB (unused JS flag in PageSpeed)
const Services   = lazy(() => import("./pages/Services"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const About      = lazy(() => import("./pages/About"));
const Contact    = lazy(() => import("./pages/Contact"));
const Privacy    = lazy(() => import("./pages/Privacy"));
const Terms      = lazy(() => import("./pages/Terms"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AnalyticsDashboard = lazy(() => import("./pages/AnalyticsDashboard"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const NotFound   = lazy(() => import("./pages/NotFound"));

// Minimal inline fallback — matches the dark background so there is no flash
function PageLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#07122A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "14px",
          color: "#8B9CB6",
          letterSpacing: "1px",
        }}
      >
        Loading…
      </span>
    </div>
  );
}
function Router() {
  // Initialize analytics tracking
  useAnalytics();
  
  // make sure to consider if you need authentication for certain routes
  // AdminDashboard is protected by the DashboardLayout component which requires authentication
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/services"} component={Services} />
        <Route path={"/results"} component={CaseStudies} />
        <Route path={"/about"} component={About} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/admin"} component={AdminDashboard} />
        <Route path={"/admin/analytics"} component={AnalyticsDashboard} />
        <Route path={"/unsubscribe/:token"} component={Unsubscribe} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <ServiceWorkerUpdateNotification />
          <Router />
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
