import { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { 
  Home, 
  Heart, 
  BookOpen, 
  Brain, 
  AlertTriangle, 
  Calendar,
  Settings,
  User,
  Moon,
  Sun,
  LogOut,
  MessageCircle,
  Users,
  BarChart3,
  Globe
} from "lucide-react";

import { Dashboard } from "./components/Dashboard";
import { MoodTracker } from "./components/MoodTracker";
import { ResourceLibrary } from "./components/ResourceLibrary";
import { SelfAssessment } from "./components/SelfAssessment";
import { CrisisSupport } from "./components/CrisisSupport";
import { AIChat } from "./components/AIChat";
import { BookingSystem } from "./components/BookingSystem";
import { PeerSupport } from "./components/PeerSupport";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // In real app, this would come from authentication

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "ai-chat", label: "AI Support", icon: MessageCircle, badge: "AI" },
    { id: "mood-tracker", label: "Mood Tracker", icon: Heart },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "assessment", label: "Assessment", icon: Brain },
    { id: "peer-support", label: "Peer Support", icon: Users },
    { id: "booking", label: "Book Session", icon: Calendar },
    { id: "crisis", label: "Crisis Support", icon: AlertTriangle, badge: "24/7" },
    { id: "admin", label: "Admin Dashboard", icon: BarChart3, adminOnly: true }
  ];

  const renderContent = () => {
    switch (currentSection) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentSection} />;
      case "ai-chat":
        return <AIChat />;
      case "mood-tracker":
      case "mood-check":
      case "mood-history":
        return <MoodTracker />;
      case "resources":
        return <ResourceLibrary />;
      case "assessment":
        return <SelfAssessment />;
      case "peer-support":
        return <PeerSupport />;
      case "booking":
        return <BookingSystem />;
      case "crisis":
        return <CrisisSupport />;
      case "admin":
        return isAdmin ? <AdminDashboard /> : <Dashboard onNavigate={setCurrentSection} />;
      case "booking-old":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-semibold text-slate-700 mb-2">Book Counseling Session 📅</h1>
              <p className="text-lg text-slate-500">
                Schedule an appointment with our mental health professionals
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50/50 p-12 rounded-3xl text-center border border-blue-100 shadow-sm">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-700">Booking System Coming Soon</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                Our online booking system is currently being developed. In the meantime, 
                please call our counseling center directly for personalized support.
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl px-8 py-3 text-white font-medium shadow-sm">
                📞 Call (555) 123-4568
              </Button>
            </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <SidebarProvider>
      <div className={`flex h-screen w-full ${isDarkMode ? "dark" : ""}`}>
        <Sidebar className="border-r-0 bg-gradient-to-b from-slate-50/80 to-blue-50/40 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-sm">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-700">MindWell</h2>
                <p className="text-sm text-slate-500">Student Mental Health</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-6">
            <SidebarMenu className="space-y-2">
              {navigationItems
                .filter(item => !item.adminOnly || isAdmin)
                .map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setCurrentSection(item.id)}
                    isActive={currentSection === item.id}
                    className={`w-full justify-start h-12 rounded-xl transition-all duration-200 ${
                      currentSection === item.id 
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm" 
                        : "hover:bg-white/60 hover:shadow-sm text-slate-600"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={currentSection === item.id ? "secondary" : "outline"} 
                        className={`ml-auto text-xs ${
                          currentSection === item.id 
                            ? "bg-white/20 text-white border-white/30" 
                            : item.badge === "AI" 
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-red-50 text-red-600 border-red-200"
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <div className="mt-auto pt-8 space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={toggleDarkMode} 
                  className="w-full justify-start h-10 rounded-lg hover:bg-white/60 text-slate-600"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start h-10 rounded-lg hover:bg-white/60 text-slate-600">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setIsAdmin(!isAdmin)}
                  className="w-full justify-start h-10 rounded-lg hover:bg-white/60 text-slate-600"
                >
                  <User className="h-4 w-4" />
                  <span>{isAdmin ? "Student View" : "Admin Mode"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </SidebarContent>

          <div className="border-t border-slate-200/50 p-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-slate-200/50">
              <Avatar className="h-9 w-9 ring-2 ring-blue-100">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-medium">AS</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-slate-700">Alex Student</p>
                <p className="text-xs text-slate-500 truncate">alex.student@university.edu</p>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700 hover:bg-slate-100/50">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30">
          <header className="border-b border-slate-200/50 p-6 flex items-center gap-4 bg-white/60 backdrop-blur-sm">
            <SidebarTrigger className="text-slate-600" />
            <div className="flex-1" />
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 border-red-200 hover:bg-red-50 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Emergency: Call 988
            </Button>
          </header>

          <main className="flex-1 overflow-auto p-8">
            <div className="max-w-6xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}