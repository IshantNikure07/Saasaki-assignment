'use client'
import React, { useEffect } from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "@/app/firebase/config"
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const Home = () => {

  const [user , loading] = useAuthState(auth)
  const {dark} = useAppContext()
  const router = useRouter()
  console.log("user" , user)
  const userSession = sessionStorage.getItem("user")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);
  

  if (loading || !user) return <Loading/> ; // Or show a loader
  
  return (
    < section className={`${dark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Navbar signOut={() => signOut(auth)}/>
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
