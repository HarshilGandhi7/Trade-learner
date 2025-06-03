import toast from "react-hot-toast";
import {auth} from "../../../firebaseConfig";
import { updatePassword } from "@/utils/auth";

interface UserData {
  uid: string;
  email: string;
  username: string;
}

export const ChangePassword = ({userData}: {userData: UserData}) => {
    
  const updateUserPassword = async () => {
    const newPasswordInput = document.getElementById(
      "new-password"
    ) as HTMLInputElement;
    const currentPasswordInput = document.getElementById(
      "current-password"
    ) as HTMLInputElement;
    const user = auth.currentUser;

    if (!newPasswordInput?.value || !currentPasswordInput?.value) {
      toast.error("Please enter both current and new password");
      return;
    }

    if (newPasswordInput.value.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!user || !user.email) {
      toast.error("You need to be logged in to change password");
      return;
    }

    const response = await updatePassword(
      newPasswordInput.value,
      currentPasswordInput.value
    );
    if (!response) {
      toast.success("Error in changing Password!");
    } else {
      const responseData = await response.json();
      if (responseData.success) {
        toast.success("Password changed successfully");
      } else if (!responseData.success) {
        toast.error(responseData.message || "Failed to change password");
      }
    }

    newPasswordInput.value = "";
    currentPasswordInput.value = "";
  };
  return (
    <div className="bg-zinc-800 rounded-lg border border-zinc-700">
      <div className="p-6 border-b border-zinc-700">
        <h2 className="text-lg font-medium text-white">Account Settings</h2>
      </div>
      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-md font-medium text-white mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-zinc-400"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-white"
                defaultValue={userData?.username || ""}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-white"
                defaultValue={userData?.email || ""}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-white mb-4">Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-zinc-400"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-white"
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-zinc-400"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <button className="px-4 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 mr-3">
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500"
            onClick={updateUserPassword}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
