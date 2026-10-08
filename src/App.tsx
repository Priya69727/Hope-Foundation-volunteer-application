import { useState } from "react";
import { AppShell } from "./components/layout";
import { DemoStoreProvider } from "./components/demoStore";
import { AuthPage } from "./pages/AuthPage";

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("volunteer-portal-demo-auth") === "true");
  const login = (remember = false) => {
    if (remember) window.localStorage.setItem("volunteer-portal-demo-auth", "true");
    else window.localStorage.removeItem("volunteer-portal-demo-auth");
    setAuthenticated(true);
  };
  const logout = () => {
    window.localStorage.removeItem("volunteer-portal-demo-auth");
    setAuthenticated(false);
  };
  return (
    <DemoStoreProvider>
      {authenticated ? <AppShell logout={logout} /> : <AuthPage onLogin={login} />}
    </DemoStoreProvider>
  );
}
