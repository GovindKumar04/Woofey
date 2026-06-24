import { useSelector } from "react-redux";

function Profile() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="pt-24 px-4 md:px-20">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-24 px-4 md:px-20">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-red-500 mt-2">
          Please login to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="bg-white shadow rounded p-6 max-w-md">
        <p className="mb-2">
          <span className="font-semibold">Name:</span>{" "}
          {user?.name || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span>{" "}
          {user?.email || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Phone:</span>{" "}
          {user?.number || "N/A"}
        </p>

        <p className="text-gray-500 mt-4 text-sm">
          Order history will appear here later.
        </p>
      </div>
    </div>
  );
}

export default Profile;
