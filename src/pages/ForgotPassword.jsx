import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function ForgotPassword(){
  const { resetPassword } = useAuth();
  const { state } = useLocation();
  const prefillEmail = state?.email || "";

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      await resetPassword(email);
      toast.success("Password reset email sent!");
      window.location.href = "https://mail.google.com";
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" type="email" defaultValue={prefillEmail} className="input input-bordered w-full" required />
        <button className="btn btn-primary w-full">Send Reset Link</button>
      </form>
    </div>
  );
}
