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
          ? "bg-red-500 text-slate-50 hover:ring-slate-700 active:bg-slate-700"
          : color === "light"
            ? "bg-slate-50 text-slate-950 hover:ring-slate-200 active:bg-slate-200"
            : ""
      } px-4 py-1 ring-inset hover:ring`}
      href={href}
    >
      {children}
    </Link>
  );
};
