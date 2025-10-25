import {
  Building2,
  Settings,
  Info,
  MessageSquare,
  Sparkles,
  MoreVertical,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@workspace/ui/components/select";
import { Separator } from "@workspace/ui/components/separator";
import { Spinner } from "@workspace/ui/components/spinner";
import { cn } from "@workspace/ui/lib/utils";

export interface Branch {
  id: string;
  name: string;
  type: string;
  icon?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
}

export interface PlanInfo {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
}

export interface SidebarProps {
  branches: Branch[];
  currentBranch: Branch;
  onBranchChange: (branch: Branch) => void;
  navigationItems: NavigationItem[];
  user: User;
  planInfo?: PlanInfo;
  onLogout: () => void;
  isLoggingOut?: boolean;
  className?: string;
}

export function Sidebar({
  branches,
  currentBranch,
  onBranchChange,
  navigationItems,
  user,
  planInfo,
  onLogout,
  isLoggingOut = false,
  className,
}: SidebarProps) {
  const handleNavigation = (href: string) => {
    // This will be handled by the parent component
    window.location.href = href;
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className={cn("flex h-full w-64 flex-col bg-background border-r", className)}>
      {/* Branch Switcher */}
      <div className="p-4">
        <Select
          value={currentBranch.id}
          onValueChange={(value) => {
            const branch = branches.find((b) => b.id === value);
            if (branch) onBranchChange(branch);
          }}
        >
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">{currentBranch.name}</span>
                <span className="text-xs text-muted-foreground">{currentBranch.type}</span>
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            {branches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id}>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{branch.name}</span>
                    <span className="text-xs text-muted-foreground">{branch.type}</span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = item.isActive;
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-2", isActive && "bg-secondary")}
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Utility Links */}
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => handleNavigation("/settings")}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => handleNavigation("/about")}
          >
            <Info className="h-4 w-4" />
            About
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => handleNavigation("/feedback")}
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Button>
        </div>
      </nav>

      {/* Plan Expiration Card */}
      {planInfo && (
        <div className="p-4">
          <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{planInfo.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{planInfo.description}</p>
                  <Button size="sm" className="mt-2 h-7 text-xs" onClick={planInfo.onAction}>
                    {planInfo.actionText}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Section */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">
              {user.initials ||
                user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? (
                  <Spinner className="mr-2 h-4 w-4" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                {isLoggingOut ? "Signing out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
