import AppSidebar from "@/components/explorar/appSideBar";

export default function ExplorarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppSidebar />
      <div className="md:pl-64">{children}</div>
    </div>
  );
}
