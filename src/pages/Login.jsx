
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import prettyAuthError from "../utils/prettyAuthError";
import GoogleLogo from "../assets/google.png"

export default function Login() {
  const { login, googleLogin } = useAuth();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.pathname || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const emailVal = f.email.value.trim();
    const passVal = f.password.value;

    
    if (!/^\S+@\S+\.\S+$/.test(emailVal)) {
      toast.error("একটি বৈধ ইমেইল দিন।");
      return;
    }
    if (!passVal) {
      toast.error("পাসওয়ার্ড দিন।");
      return;
    }

    try {
      setLoading(true);
      await login(emailVal, passVal);
      toast.success("Logged in!");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(prettyAuthError(err, "login"));
    } finally {
      setLoading(false);
    }
  };

  const googleSign = async () => {
    try {
      setLoading(true);
      await googleLogin();
      toast.success("Logged in with Google!");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(prettyAuthError(err, "login"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            name="password"
            type={show ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 opacity-70"
            onClick={() => setShow(!show)}
            aria-label="Toggle password visibility"
          >
            {show ? "👁️" : "👁️"}
          </button>
        </div>

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <div className="flex justify-between mt-3">
        <Link to="/forgot-password" state={{ email }} className="link">
          Forget Password?
        </Link>
        <Link to="/signup" className="link">
          Create account
        </Link>
      </div>

      <div className="divider">or</div>

      <button
        onClick={googleSign}
        className="btn btn-outline w-full"
        disabled={loading}
      >
      <img className="w-[25px]" src={GoogleLogo} alt="" />  Continue with Google
      </button>
    </div>
  );
}
