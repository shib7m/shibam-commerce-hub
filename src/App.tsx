import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { AdminProvider } from "./contexts/AdminContext";
import MobileOptimization from "./components/MobileOptimization";
import { OptimizedAdmin, OptimizedCart } from "./components/PerformanceOptimizer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Electronics from "./pages/Electronics";
import Furniture from "./pages/Furniture";
import OfficeFurniture from "./pages/OfficeFurniture";
import HomeDecor from "./pages/HomeDecor";
import SmallAppliances from "./pages/SmallAppliances";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact";
import Partners from "./pages/Partners";
import Offers from "./pages/Offers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 دقائق
      gcTime: 10 * 60 * 1000, // 10 دقائق (تم تغيير cacheTime إلى gcTime)
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <CartProvider>
          <SidebarProvider>
            <MobileOptimization />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Legacy routes for backwards compatibility */}
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
                
                {/* New category routes */}
                {/* Home Furniture */}
                <Route path="/home-furniture" element={<CategoryPage category="home-furniture" />} />
                <Route path="/home-furniture/bedrooms" element={<CategoryPage category="home-furniture" subcategory="bedrooms" />} />
                <Route path="/home-furniture/living-rooms" element={<CategoryPage category="home-furniture" subcategory="living-rooms" />} />
                <Route path="/home-furniture/dining-rooms" element={<CategoryPage category="home-furniture" subcategory="dining-rooms" />} />
                
                {/* Kitchen Appliances */}
                <Route path="/kitchen-appliances" element={<CategoryPage category="kitchen-appliances" />} />
                <Route path="/kitchen-appliances/blenders" element={<CategoryPage category="kitchen-appliances" subcategory="blenders" />} />
                <Route path="/kitchen-appliances/ovens" element={<CategoryPage category="kitchen-appliances" subcategory="ovens" />} />
                <Route path="/kitchen-appliances/washing-machines" element={<CategoryPage category="kitchen-appliances" subcategory="washing-machines" />} />
                <Route path="/kitchen-appliances/kitchen-tools" element={<CategoryPage category="kitchen-appliances" subcategory="kitchen-tools" />} />
                <Route path="/kitchen-appliances/home-cookware" element={<CategoryPage category="kitchen-appliances" subcategory="home-cookware" />} />
                <Route path="/kitchen-appliances/refrigerators" element={<CategoryPage category="kitchen-appliances" subcategory="refrigerators" />} />
                <Route path="/kitchen-appliances/coolers" element={<CategoryPage category="kitchen-appliances" subcategory="coolers" />} />
                <Route path="/kitchen-appliances/cabinets-kitchen" element={<CategoryPage category="kitchen-appliances" subcategory="cabinets-kitchen" />} />
                
                {/* Televisions */}
                <Route path="/televisions" element={<CategoryPage category="televisions" />} />
                <Route path="/televisions/tv-screens" element={<CategoryPage category="televisions" subcategory="tv-screens" />} />
                <Route path="/televisions/receivers" element={<CategoryPage category="televisions" subcategory="receivers" />} />
                <Route path="/televisions/screen-accessories" element={<CategoryPage category="televisions" subcategory="screen-accessories" />} />
                <Route path="/televisions/remote-controls" element={<CategoryPage category="televisions" subcategory="remote-controls" />} />
                
                {/* Electronics */}
                <Route path="/electronics/mobile-electronics" element={<CategoryPage category="electronics" subcategory="mobile-electronics" />} />
                <Route path="/electronics/general-electronics" element={<CategoryPage category="electronics" subcategory="general-electronics" />} />
                <Route path="/electronics/gaming-consoles" element={<CategoryPage category="electronics" subcategory="gaming-consoles" />} />
                <Route path="/electronics/computer-accessories" element={<CategoryPage category="electronics" subcategory="computer-accessories" />} />
                
                {/* Stationery */}
                <Route path="/stationery" element={<CategoryPage category="stationery" />} />
                <Route path="/stationery/notebooks-supplies" element={<CategoryPage category="stationery" subcategory="notebooks-supplies" />} />
                <Route path="/stationery/school-uniforms" element={<CategoryPage category="stationery" subcategory="school-uniforms" />} />
                
                {/* Clothing */}
                <Route path="/clothing" element={<CategoryPage category="clothing" />} />
                <Route path="/clothing/girls-abayas" element={<CategoryPage category="clothing" subcategory="girls-abayas" />} />
                <Route path="/clothing/kids-dresses" element={<CategoryPage category="clothing" subcategory="kids-dresses" />} />
                <Route path="/clothing/underwear" element={<CategoryPage category="clothing" subcategory="underwear" />} />
                <Route path="/clothing/evening-dresses" element={<CategoryPage category="clothing" subcategory="evening-dresses" />} />
                <Route path="/clothing/shoes" element={<CategoryPage category="clothing" subcategory="shoes" />} />
                <Route path="/clothing/accessories" element={<CategoryPage category="clothing" subcategory="accessories" />} />
                <Route path="/clothing/beauty-tools" element={<CategoryPage category="clothing" subcategory="beauty-tools" />} />
                
                {/* Other routes */}
                <Route path="/cart" element={<OptimizedCart />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/admin" element={<OptimizedAdmin />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </CartProvider>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
