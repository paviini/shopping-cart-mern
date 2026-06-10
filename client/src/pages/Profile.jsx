function Profile() {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return (
    <div>

      <h1>My Profile</h1>

      <p>Name: {userInfo?.name}</p>

      <p>Email: {userInfo?.email}</p>

    </div>
  );
}

export default Profile;