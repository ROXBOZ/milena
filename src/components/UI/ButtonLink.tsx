import Link from "next/link";

export const ButtonLink = ({
  href,
  children,
  color,
  isInternalLink,
}: {
  href: string;
  children: React.ReactNode;
  color?: "dark" | "light";
  isInternalLink: boolean;
}) => {
  return (
    <Link
      target={isInternalLink ? "_self" : "_blank"}
      className={`whitespace-nowrap ${
        color === "dark"
          ? "bg-red-500 text-stone-50 hover:ring-stone-700 active:bg-stone-700"
          : color === "light"
            ? "bg-stone-50 text-stone-950 hover:ring-stone-200 active:bg-stone-200"
            : ""
      } px-4 py-1 ring-inset hover:ring`}
      href={href}
    >
      {children}
    </Link>
  );
};
