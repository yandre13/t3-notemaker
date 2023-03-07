import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session)
    return (
      <>
        <Header />
      </>
    );

  return (
    <>
      <Header />
      <main className="mx-5 mt-5 grid grid-cols-4 gap-2">
        <div className="px-2">
          <Sidebar session={session} />
        </div>
        <div className="col-span-3">{children}</div>
      </main>
    </>
  );
}
