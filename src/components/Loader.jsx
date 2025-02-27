"use client"
import { useEffect, useState } from "react";

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Show loader for 2 seconds
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  };
  
  export default Loader;
  