import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[65vh] container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}
