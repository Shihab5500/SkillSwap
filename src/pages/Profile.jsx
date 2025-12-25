import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Profile(){
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  const onUpdate = async (e) => {
    e.preventDefault();
    const f = e.target;
    try{
      await updateProfile(auth.currentUser, {
        displayName: f.name.value,
        photoURL: f.photo.value
      });
      toast.success("Profile updated!");
      setEditing(false);
      window.location.reload();
    }catch(err){
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="flex items-center gap-4">
        <img src={user.photoURL || "https://i.pravatar.cc/100"} className="w-20 h-20 rounded-full"/>
        <div>
          <p className="font-semibold">{user.displayName || "No Name"}</p>
          <p className="opacity-70">{user.email}</p>
        </div>
      </div>

      <button className="btn btn-outline mt-5" onClick={()=>setEditing(!editing)}>
        {editing ? "Cancel" : "Update Profile"}
      </button>

      {editing && (
        <form onSubmit={onUpdate} className="space-y-3 mt-4">
          <input name="name" defaultValue={user.displayName || ""} className="input input-bordered w-full" required />
          <input name="photo" defaultValue={user.photoURL || ""} className="input input-bordered w-full" />
          <button className="btn btn-primary w-full">Save</button>
        </form>
      )}
    </div>
  );
}
