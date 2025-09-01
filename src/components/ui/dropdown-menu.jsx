"use client";
import * as React from "react";
import { Menu } from "lucide-react"; 
import {
  DropdownMenu as HeadlessDropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu"; 

export const DropdownMenu = HeadlessDropdownMenu;
export {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};

export function BasicDropdown({ label = "Options", items = [] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md shadow">
          <Menu className="mr-2 h-4 w-4" />
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={5}
        className="min-w-[180px] bg-white border rounded-md shadow-md p-1"
      >
        <DropdownMenuLabel className="px-2 py-1.5 text-sm text-gray-600">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 border-t" />
        {items.map((item, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={item.onClick}
            className="cursor-pointer px-2 py-1.5 text-sm rounded hover:bg-gray-100 focus:bg-gray-100"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
