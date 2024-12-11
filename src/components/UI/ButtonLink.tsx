import Link from "next/link";

export const ButtonLink = ({
  href,
  children,
  color,
  isInternalLink,
}: {
  href: string;
  children: React.ReactNode;
  color?: "dark";
  isInternalLink: boolean;
}) => {
  return (
    <Link
      target={isInternalLink ? "_self" : "_blank"}
      className={`whitespace-nowrap rounded-full ${
        color === "dark"
          ? "bg-slate-800 text-slate-50 hover:ring-slate-700 active:bg-slate-700"
          : ""
      } px-4 py-1 ring-inset hover:ring`}
      href={href}
    >
      {children}
    </Link>
  );
};
