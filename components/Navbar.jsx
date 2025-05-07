"use client"
import React, { useEffect } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import {auth} from "@/app/firebase/config"
import { IoSunny } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

const Navbar = ({signOut}) => {

  const { isSeller, router, cart , wishlistIds , setDark , dark} = useAppContext();

  useEffect(()=>{
    console.log("Dark" , dark)
  } , [dark])

  useEffect(() => {
    // Check if dark mode already set in sessionStorage
    const storedTheme = sessionStorage.getItem("dark");
    if (storedTheme) {
      setDark(storedTheme === "true");
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("dark", dark);
  }, [dark]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-2 border-b border-gray-200 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.brand_logo}
        alt="logo"
      />
      <div className={`flex ${dark ? "text-white" : " text-black"} items-center gap-4 lg:gap-8 max-md:hidden`}>
        <Link href="/" className="hover:text-[#EA580C] transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-[#EA580C] transition">
          Shop
        </Link>
        <Link href="/my-orders" className="hover:text-[#EA580C] transition">
          Orders
        </Link>
        <Link href="/" className="hover:text-[#EA580C] transition">
          Contact
        </Link>

        {/* {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>} */}

      </div>

      <ul className="flex  items-center gap-4 ">
        <div className="relative inline-block">
          {/* Heart icon */}
          < IoIosHeartEmpty className={` ${dark ? "text-white" : " text-gray-600"}  hover:text-[#EA580C] text-2xl cursor-pointer`}/>

          {/* Count badge */}
          {wishlistIds.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
        </div>

        {/* <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" /> */}
        <div className="relative inline-block">
          <IoCartOutline onClick={()=>router.push("/cart")} className={` ${dark ? "text-white" : " text-gray-600"}  hover:text-[#EA580C] text-2xl cursor-pointer`}/>

          {/* Count badge */}
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
        <div className="relative inline-block">
          { dark ?  <IoSunny  onClick={()=> setDark(!dark)} className={` ${dark ? "text-white" : " text-gray-600"} text-2xl cursor-pointer`}/>
               :           < IoMoonOutline   onClick={()=> setDark(!dark)} className={` ${dark ? "text-white" : " text-gray-600"} text-xl cursor-pointer`}/>

          }
        </div>
        {/* <IoCartOutline className="scale-125" /> */}
        <button  onClick={async () => {
    await signOut;
    sessionStorage.removeItem("user");
    router.push("/login"); // or wherever you want
  }}
         className={` ${dark ? "text-white" : "text-gray-600"} flex items-center gap-2 hover:text-[#EA580C] transition`}>
          {/* <Image src={assets.user_icon} alt="user icon" /> */}
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;