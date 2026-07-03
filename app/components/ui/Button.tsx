import type { AnchorHTMLAttributes, ReactNode } from "react";

// Jediný zdroj pravdy pro tlačítka na celém webu.
// Radius, padding, font i přechody se drží jednotně přes varianty a velikosti,
// takže se styl tlačítek nemůže rozejít mezi sekcemi.

type Variant = "primary" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-colors duration-200";

const variants: Record<Variant, string> = {
  // Plná značková – funguje na světlém i tmavém pozadí.
  primary: "bg-brand text-white hover:bg-brand-hover",
  // Obrysová – určená pro tmavé pozadí (hero, audit sekce).
  outline:
    "border border-white/40 text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
