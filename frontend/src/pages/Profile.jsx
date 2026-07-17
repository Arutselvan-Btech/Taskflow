import React from "react";

function Profile() {
  return (
    <div className="profile-page">
      <h1>👤 User Profile</h1>

      <div className="profile-card">
        <h2>Senthil</h2>
        <p>Email: senthil@example.com</p>
        <p>Status: Logged In</p>
        <p>Role: TaskFlow User</p>

        <button onClick={() => window.location.href = "/dashboard"}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;