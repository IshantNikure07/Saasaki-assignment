import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Footer = () => {
  const {dark} = useAppContext()
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.brand_logo} alt="logo" />
          <p className="mt-6 text-sm">
          Find everything you need — from Men's and Women's fashion to Jewelry and Electronics — all in one place. Explore top-quality products, updated daily, and enjoy smooth shopping with fast checkout. Whether you're upgrading your style or your tech, we've got you covered.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className={`font-medium ${dark ? "text-white" : "text-gray-900"}  mb-5`}>Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">Home</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">About us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Contact us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className={`font-medium ${dark ? "text-white" : "text-gray-900"}  mb-5`}>Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>8788407623</p>
              <p>ishantnikure712@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © Bclassy.dev All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;