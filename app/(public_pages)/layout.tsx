import Navbar from "@/components/shared/Navbar";

export default function PublicLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="pt-16">
      <Navbar />
      {children}
    </div>
  );
}
