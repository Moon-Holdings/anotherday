import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DragDropProvider } from "@/contexts/drag-drop-context";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import Tasks from "./pages/Tasks";
import RestrictedTasks from "./pages/RestrictedTasks";
import Schedule from "./pages/Schedule";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import CreateOrganization from "./pages/CreateOrganization";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DragDropProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-organization" element={<CreateOrganization />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:taskListId" element={<Tasks />} />
            <Route path="/restricted-tasks" element={<RestrictedTasks />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DragDropProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
