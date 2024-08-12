"use client";
import React from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuGroups } from "@/app/constants";

const SideBar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <aside className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 shadow-md sticky top-0">
      <Link href="/" className="text-2xl flex gap=2">
        <span className="text-2xl font-bold uppercase">Syncra</span>
        <span className="text-sm italic">Backend</span>
      </Link>

      <div className="grow">
        <Command className="overflow-visible">
          <CommandList className="overflow-visible">
            {menuGroups.map((group, index) => (
              <React.Fragment key={index}>
                <CommandGroup heading={group.heading}>
                  {group.items.map((item, itemIndex) => (
                    <Link
                      href={item.href}
                      key={itemIndex}
                      className={pathname === item.href ? "bg-gray-400" : ""}
                    >
                      <CommandItem>{item.label}</CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </div>
      <div className="flex gap-2 items-center text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md">
        <h3>Updated as of:</h3>
        <span>Aug 08, 2024</span>
      </div>
    </aside>
  );
};

export default SideBar;
