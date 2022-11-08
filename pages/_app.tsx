import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NavBar from "components/NavBar";
import { useCurrentUser, UserContext } from "@lib/context";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import AuthGuard from "../components/AuthGuard";
import { useRouter } from "next/router";

function AppContent(props: { children: JSX.Element | JSX.Element[] }) {
  const router = useRouter();
  const user = useCurrentUser();
  if (router.pathname == "/login") {
    return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
  }

  return (
    <AuthGuard>
      <UserContext.Provider value={user}>
        <div className="h-screen flex flex-col">
          <NavBar user={user} />
          {props.children}
        </div>
      </UserContext.Provider>
    </AuthGuard>
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <AppContent>
        <div className="flex-grow h-100">
          <Component {...pageProps} />
        </div>
      </AppContent>
    </SessionProvider>
  );
}

export default MyApp;
