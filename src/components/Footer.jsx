"use client"
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#1a2246] text-white border-t py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} School Management. All rights reserved.
        </p>
       
      </div>
    </footer>
  );
};

export default Footer;
