"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 shadow-md">
      <Link href="/" className="text-2xl flex gap=2">
        <span className="text-2xl font-bold uppercase">Syncra</span>
        <span className="text-sm italic">Backend</span>
      </Link>

      <div className="grow">
        <Command className="overflow-visible">
          <CommandList className="overflow-visible">
            <CommandGroup heading="Getting Started">
              <CommandItem>Introduction</CommandItem>
              <CommandGroup heading="Docker Setup">
                <CommandItem>Setup and Run Syncra</CommandItem>
                <CommandItem>Updating the Syncra Backend</CommandItem>
              </CommandGroup>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Models Reference">
              <CommandItem>Models Overview</CommandItem>
              <CommandItem>Models vs Enum</CommandItem>
              <CommandItem>Model Structures</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="API Reference">
              <CommandItem>Routes</CommandItem>
              <CommandItem>API Versions</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Team Documentation">
              <CommandItem>Code of Conduct</CommandItem>
              <CommandItem>Contributions</CommandItem>
              <CommandItem>Submitting Features and/or Bug Reports</CommandItem>
              <CommandItem>Contact</CommandItem>
              <CommandItem>License</CommandItem>
            </CommandGroup>
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
