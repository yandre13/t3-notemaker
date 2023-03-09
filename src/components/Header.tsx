import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        {sessionData?.user?.name ? (
          <Link href="/">Notes for {sessionData.user.name}</Link>
        ) : null}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          {sessionData?.user ? (
            <label
              tabIndex={0}
              className="btn-ghost btn-circle avatar btn"
              onClick={() => void signOut()}
            >
              <div className="w-10 rounded-full">
                <Image
                  src={sessionData.user?.image as string}
                  alt={sessionData.user?.name as string}
                  width={40}
                  height={40}
                />
              </div>
            </label>
          ) : (
            <button
              className="btn-ghost rounded-btn btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
