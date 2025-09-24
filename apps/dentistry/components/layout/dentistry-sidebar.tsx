"use client";

import { useState } from "react";

import { Sidebar, Branch, NavigationItem, User, PlanInfo } from "@workspace/ui/shared";
import {
  Users,
  FileText,
  Activity,
  UserCheck,
  Stethoscope,
  CreditCard,
  TrendingUp,
} from "lucide-react";

// Dentistry-specific navigation items
const dentistryNavigationItems: NavigationItem[] = [
  {
    label: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    label: "Treatment Record",
    href: "/treatment-record",
    icon: FileText,
  },
  {
    label: "Dental Chart",
    href: "/dental-chart",
    icon: Activity,
  },
  {
    label: "Dentists",
    href: "/dentists",
    icon: UserCheck,
  },
  {
    label: "Procedures",
    href: "/procedures",
    icon: Stethoscope,
  },
  {
    label: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    label: "Sales",
    href: "/sales",
    icon: TrendingUp,
  },
];

// Sample branches data
const sampleBranches: Branch[] = [
  {
    id: "main-branch",
    name: "Associhealth Dentistry",
    type: "Main Branch",
  },
  {
    id: "branch-2",
    name: "Downtown Clinic",
    type: "Branch Office",
  },
  {
    id: "branch-3",
    name: "Mall Location",
    type: "Satellite Office",
  },
];

// Sample user data
const sampleUser: User = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@associhealth.com",
  initials: "SJ",
};

// Sample plan info
const samplePlanInfo: PlanInfo = {
  title: "Plan about to expire",
  description: "Enjoy 10% off when renewing your plan today.",
  actionText: "Get the discount",
  onAction: () => {
    // Handle plan renewal
    console.log("Plan renewal clicked");
  },
};

export interface DentistrySidebarProps {
  className?: string;
  currentBranchId?: string;
  onBranchChange?: (branch: Branch) => void;
  onLogout?: () => void;
  planInfo?: PlanInfo;
  user?: User;
}

export function DentistrySidebar({
  className,
  currentBranchId = "main-branch",
  onBranchChange,
  onLogout,
  planInfo = samplePlanInfo,
  user = sampleUser,
}: DentistrySidebarProps) {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(
    sampleBranches.find((b) => b.id === currentBranchId) || sampleBranches[0]!
  );

  const handleBranchChange = (branch: Branch) => {
    setSelectedBranch(branch);
    onBranchChange?.(branch);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = "/sign-in";
    }
  };

  return (
    <Sidebar
      branches={sampleBranches}
      currentBranch={selectedBranch}
      onBranchChange={handleBranchChange}
      navigationItems={dentistryNavigationItems}
      user={user}
      planInfo={planInfo}
      onLogout={handleLogout}
      className={className}
    />
  );
}
