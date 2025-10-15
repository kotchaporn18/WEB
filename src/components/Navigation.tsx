import { Home, Activity, Apple, Target, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Activity, label: "Activities", path: "/activities" },
    { icon: Apple, label: "Nutrition", path: "/nutrition" },
    { icon: Target, label: "Goals", path: "/goals" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r border-border">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6 mb-8">
            <Activity className="h-8 w-8 text-primary" />
            <span className="ml-3 text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              HealthTrack
            </span>
          </div>
          <nav className="mt-5 flex-1 px-3 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              HealthTrack
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="px-4 py-4 space-y-2 bg-card border-t border-border animate-fade-in">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="flex flex-col items-center p-2">
              <item.icon
                className={`h-6 w-6 ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs mt-1 ${
                  isActive(item.path) ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
