

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import prettyAuthError from "../utils/prettyAuthError";
import GoogleLogo from "../assets/google.png"

export default function Signup() {
  const { signup, updateUserProfile, googleLogin } = useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const photo = f.photo.value.trim();
    const password = f.password.value;

    // simple password rules (uppercase + lowercase + length >= 6)
    if (!/[A-Z]/.test(password)) return toast.error("পাসওয়ার্ডে অন্তত ১টি বড় হাতের অক্ষর থাকতে হবে।");
    if (!/[a-z]/.test(password)) return toast.error("পাসওয়ার্ডে অন্তত ১টি ছোট হাতের অক্ষর থাকতে হবে।");
    if (password.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");

    try {
      setLoading(true);
      const cred = await signup(email, password); // duplicate email হলে এখানেই error throw হবে
      await updateUserProfile(name || cred.user.displayName, photo || cred.user.photoURL);
      toast.success("Account created!");
      nav("/", { replace: true });
    } catch (err) {
      toast.error(prettyAuthError(err, "signup"));
    } finally {
      setLoading(false);
    }
  };

  const googleSign = async () => {
    try {
      setLoading(true);
      await googleLogin();
      toast.success("Signed up with Google!");
      nav("/", { replace: true });
    } catch (err) {
      toast.error(prettyAuthError(err, "signup"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create account</h2>

      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" type="text" placeholder="Your Name" className="input input-bordered w-full" />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input name="photo" type="url" placeholder="Photo URL (optional)" className="input input-bordered w-full" />

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
          {loading ? "Please wait..." : "Sign up"}
        </button>
      </form>

      <p className="text-sm mt-3">
        Already have an account? <Link to="/login" className="link">Login</Link>
      </p>

      <div className="divider">or</div>
      <button onClick={googleSign} className="btn btn-outline w-full" disabled={loading}>
      <img className="w-[25px]" src={GoogleLogo} alt=""></img>  Continue with Google
      </button>
    </div>
  );
}
