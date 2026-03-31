import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/common/ScrollToTop";
import BackToTopButton from "@/components/common/BackToTopButton";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import SolutionsPage from "@/pages/SolutionsPage";
import SolutionDetailPage from "@/pages/SolutionDetailPage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import NewsPage from "@/pages/NewsPage";
import NewsDetailPage from "@/pages/NewsDetailPage";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import AnnouncementDetailPage from "@/pages/AnnouncementDetailPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import AdminRedirectPage from "@/pages/AdminRedirectPage";
import AdminPostsPage from "@/pages/AdminPostsPage";
import AdminPostFormPage from "@/pages/AdminPostFormPage";

function Router() {
  return (
    <Switch>
      <Route path="/admin/posts/moi" component={AdminPostFormPage} />
      <Route path="/admin/posts/edit/:slug" component={AdminPostFormPage} />
      <Route path="/admin/posts/:id" component={AdminPostFormPage} />
      <Route path="/admin/posts" component={AdminPostsPage} />
      <Route path="/admin" component={AdminRedirectPage} />
      <Route path="/" component={Home} />
      <Route path="/gioi-thieu" component={AboutPage} />
      <Route path="/giai-phap" component={SolutionsPage} />
      <Route path="/giai-phap/:slug" component={SolutionDetailPage} />
      <Route path="/san-pham/:slug" component={ProductDetailPage} />
      <Route path="/san-pham" component={ProductsPage} />
      <Route path="/tin-tuc/:slug" component={NewsDetailPage} />
      <Route path="/tin-tuc" component={NewsPage} />
      <Route path="/cong-bo-thong-tin/:slug" component={AnnouncementDetailPage} />
      <Route path="/cong-bo-thong-tin" component={AnnouncementsPage} />
      <Route path="/lien-he" component={ContactPage} />
      <Route path="/dang-nhap" component={LoginPage} />
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
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
