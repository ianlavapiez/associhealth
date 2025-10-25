import Image from "next/image";

/**
 * AssocihealthLogo component using banner image
 * Reusable across the application for consistent branding
 */
export function AssocihealthLogo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/associhealth-banner.png"
        alt="AssociHealth Logo"
        width={200}
        height={60}
        className="h-auto max-w-full object-contain"
        priority
      />
    </div>
  );
}
