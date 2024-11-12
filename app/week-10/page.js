"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  console.log(user);

  const login = async () => {
    await gitHubSignIn();
  };

  const logout = async () => {
    await firebaseSignOut();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-2 bg-black text-white">
      <h1 className="text-3xl mt-10">Shopping List App</h1>
      <div className="mt-4 flex flex-col items-center">
        {user ? (
          <div className="flex flex-col items-center">
            <p className="text-xl">Signed in as {user.displayName}</p>
            <p className="text-xl mb-4">({user.email})</p>
            <button
              className="text-xl px-4 py-2 bg-slate-700 rounded text-white hover:bg-white hover:text-slate-700"
              onClick={logout}
            >
              Sign out
            </button>
            <Link href="/week-10/shopping-list">
              <button className="text-xl text-white mt-4">
                Go to Shopping List &rarr;
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button
              className="text-xl px-4 py-2 bg-slate-700 rounded text-white hover:bg-white hover:text-slate-700 mb-4"
              onClick={login}
            >
              Sign in with GitHub
            </button>
            <button
              className="text-xl px-4 py-2 bg-slate-700 rounded text-white hover:bg-white hover:text-slate-700"
              onClick={() => login("google")}
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
