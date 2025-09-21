export interface DentistryConfig {
  name: string;
  description: string;
  features: {
    signIn: boolean;
    signUp: boolean;
    dashboard: boolean;
    appointments: boolean;
    patients: boolean;
    billing: boolean;
  };
  navigation: {
    label: string;
    href: string;
    icon?: string;
  }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const dentistryConfig: DentistryConfig = {
  name: "Associhealth | Dentistry",
  description: "Comprehensive dental practice management solution",
  features: {
    signIn: true,
    signUp: true,
    dashboard: true,
    appointments: true,
    patients: true,
    billing: true,
  },
  navigation: [
    {
      label: "Dashboard",
      href: "/",
      icon: "LayoutDashboard",
    },
    {
      label: "Appointments",
      href: "/appointments",
      icon: "Calendar",
    },
    {
      label: "Patients",
      href: "/patients",
      icon: "Users",
    },
    {
      label: "Billing",
      href: "/billing",
      icon: "CreditCard",
    },
  ],
  seo: {
    title: "Dental Practice Management",
    description:
      "Streamline your dental practice with our comprehensive management solution. Handle appointments, patient records, and billing efficiently.",
    keywords: [
      "dental practice management",
      "dentistry software",
      "appointment scheduling",
      "patient management",
      "dental billing",
      "healthcare software",
    ],
  },
};
