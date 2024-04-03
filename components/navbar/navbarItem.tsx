import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface NavLinkProps {
  icon: any;
  active?: boolean;
  href: string;
}

export function NavLink({ icon: Icon, active, href }: NavLinkProps) {
  return (
    <div className="a">
      <Link
        className={twMerge(
          `relative text-gray-300`,
          active && "text-purple-500",
        )}
        href={href}
      >
        {/* {isUnread.length > 0 && item.url === "/matches" && (
          <div className="unread-count before:content-[attr(data-unread)]"></div>
        )} */}
        <Icon />
      </Link>
    </div>
  );
}
