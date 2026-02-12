import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bus } from "lucide-react";

const ADMIN_PASS = "admin2026"; // simple for MVP

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      sessionStorage.setItem("svta_admin", "true");
      navigate("/admin");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm rounded-xl bg-card p-8 card-shadow">
        <div className="flex items-center justify-center gap-2 font-display text-xl font-bold text-primary mb-6">
          <Bus className="h-6 w-6" /> Admin Login
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
              placeholder="Enter admin password"
            />
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
          </div>
          <button type="submit" className="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">Default: admin2026</p>
      </div>
    </div>
  );
};

export default AdminLogin;
