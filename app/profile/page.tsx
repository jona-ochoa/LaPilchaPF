import Profile from "components/Profile";

const ProfilePage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto p-8">
        <h1 className="text-center text-4xl font-bold text-blue-900 mb-8">PERFIL DE USUARIO</h1>
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
