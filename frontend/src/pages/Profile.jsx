import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-page">
      <h1>👤 User Profile</h1>

      <div className="profile-card">

        <div className="avatar" style={{ margin: "20px auto" }}>
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h2>{user?.name || "User"}</h2>

        <p>Email: {user?.email || "No Email"}</p>

        <p>Status: Logged In</p>

        <p>Role: TaskFlow User</p>

        <button onClick={() => (window.location.href = "/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;