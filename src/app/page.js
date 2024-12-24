import Image from "next/image";
import Register from "./register/page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/components/pages/home/Home"
import Script from "next/script";

export default function HomePage() {
  return (
  <>
  <Navbar />
  <Home />
  <Footer />
  
  </>
  
  );
}
