import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mt-[56px]">{children}</div>
      <Footer />
    </>
  );
}
