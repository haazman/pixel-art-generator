import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LucideUser } from "lucide-react"; 
import Image from "next/image"; 

export function FirebaseAuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setDropdownOpen(false); // Close dropdown after logout
  };

  if (user) {
    return (
      <div className="relative">
        {/* User Icon Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-pixel-green flex items-center justify-center bg-gray-700"
        >
          <LucideUser className="h-5 w-5 sm:h-6 sm:w-6 text-white" /> {/* User icon */}
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-gray-800 text-white rounded shadow-lg">
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-sm">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left hover:bg-red-600"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-gray-500 flex items-center justify-center bg-white"
    >
      <Image
        src="/google.svg"
        alt="Google Sign-In"
        width={24}
        height={24}
        className="h-5 w-5 sm:h-6 sm:w-6"
      />
    </button>
  );
}