"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation"

const navTab = [
    {
        label: "Campaign",
        href : "/"
    },
    {
        label: "Create Campaign",
        href : "/create"
    },
    {
        label: "Dashboard",
        href : "/dashboard"
    }
]

const HeaderTab = () => {

    const pathname = usePathname();
    console.log(pathname)
  return (
    <div className="p-2 flex rounded-md bg-[#fff]">
        <ul className=" list-none flex space-x-2 text-lg font-semibold">
            {navTab.map((item) => (
                <li key={item.href} className={clsx("p-2 rounded-md hover:bg-[#efe7fd]", pathname === item.href && "bg-[#efe7fd]")}>
                    <Link href={item.href}>{item.label}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default HeaderTab
