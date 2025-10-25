import Image from "next/image";

/**
 * Dentistry illustration component
 * Reusable across the application for consistent visual branding
 */
export function DentistryIllustration() {
  return (
    <div className="flex items-center justify-center p-8">
      <Image
        src="/dentistry.png"
        alt="Dentistry illustration"
        width={700}
        height={600}
        className="max-w-full h-auto object-contain"
        priority
      />
    </div>
  );
}
