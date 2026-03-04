import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/common/ScrollToTop";
import BackToTopButton from "@/components/common/BackToTopButton";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import NewsPage from "@/pages/NewsPage";
import NewsDetailPage from "@/pages/NewsDetailPage";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import AnnouncementDetailPage from "@/pages/AnnouncementDetailPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import EmployeesPage from "@/pages/EmployeesPage";
import EmployeeDetailPage from "@/pages/EmployeeDetailPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gioi-thieu" component={AboutPage} />
      <Route path="/san-pham/:slug" component={ProductDetailPage} />
      <Route path="/san-pham" component={ProductsPage} />
      <Route path="/tin-tuc/:slug" component={NewsDetailPage} />
      <Route path="/tin-tuc" component={NewsPage} />
      <Route path="/cong-bo-thong-tin/:slug" component={AnnouncementDetailPage} />
      <Route path="/cong-bo-thong-tin" component={AnnouncementsPage} />
      <Route path="/lien-he" component={ContactPage} />
      <Route path="/dang-nhap" component={LoginPage} />
      <Route path="/nhan-vien/:id" component={EmployeeDetailPage} />
      <Route path="/nhan-vien" component={EmployeesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <BackToTopButton />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
