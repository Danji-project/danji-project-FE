const Profile = ({ profileImage }: { profileImage: string }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img
        src={profileImage}
        alt="profile"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Profile;
