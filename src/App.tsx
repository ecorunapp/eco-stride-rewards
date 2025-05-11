
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDataProvider } from "@/contexts/UserDataContext";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import WalletPage from "@/pages/WalletPage";
import EcoDropPage from "@/pages/EcoDropPage";
import AccessDropPage from "@/pages/AccessDropPage";
import ProfilePage from "@/pages/ProfilePage";
import MeetFlarePage from "@/pages/MeetFlarePage";
import RunfluencePage from "@/pages/RunfluencePage";
import MoveMatePage from "@/pages/MoveMatePage";
import NotFound from "@/pages/NotFound";
import DropTypeSelector from "@/components/DropTypeSelector";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserDataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="meetflare" element={<MeetFlarePage />} />
              <Route path="runfluence" element={<RunfluencePage />} />
              <Route path="movemate" element={<MoveMatePage />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="ecodrop" element={<EcoDropPage />} />
              <Route path="accessdrop" element={<AccessDropPage />} />
              <Route path="drop-select" element={<DropSelectPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
