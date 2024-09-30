import Image from "next/image";
import Register from "./register/page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
  <>
  <Navbar />
  <h1>This is home page</h1>
  <Footer />
  </>
  );
}
