"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./Loading";

const ProtectedRoutes = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user")

  useEffect(() => {
    if (!loading && !user && !userSession) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading || !user) return <Loading />;

  return children;
};

export default ProtectedRoutes;
