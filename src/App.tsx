import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Electronics from "./pages/Electronics";
import Furniture from "./pages/Furniture";
import OfficeFurniture from "./pages/OfficeFurniture";
import HomeDecor from "./pages/HomeDecor";
import SmallAppliances from "./pages/SmallAppliances";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/electronics" element={<Electronics />} />
              <Route path="/electronics/:subcategory" element={<CategoryPage category="electronics" />} />
              <Route path="/furniture" element={<Furniture />} />
              <Route path="/furniture/:subcategory" element={<CategoryPage category="furniture" />} />
              <Route path="/office-furniture" element={<OfficeFurniture />} />
              <Route path="/office-furniture/:subcategory" element={<CategoryPage category="office-furniture" />} />
              <Route path="/home-decor" element={<HomeDecor />} />
              <Route path="/home-decor/:subcategory" element={<CategoryPage category="home-decor" />} />
              <Route path="/small-appliances" element={<SmallAppliances />} />
              <Route path="/small-appliances/:subcategory" element={<CategoryPage category="small-appliances" />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
