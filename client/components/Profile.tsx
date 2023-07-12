'use client'

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirigir a la página de inicio de sesión si el usuario no está autenticado
  if (status === "loading") {
    return <div>Cargando...</div>;
  }
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const handleChangeAccount = () => {
    // Lógica para cambiar de cuenta
  };

  return (
    <div className="text-center">
      <img
        src={session.user?.image}
        alt="Foto de perfil"
        className="rounded-full mx-auto mb-4"
        width={150}
        height={150}
      />
      <h2 className="text-2xl font-bold mb-2">{session.user?.name}</h2>
      <p className="text-gray-500">{session.user?.email}</p>
      <div className="mt-6">
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Desloguearse
        </button>
        <button
          onClick={handleChangeAccount}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Cambiar cuenta
        </button>
      </div>
    </div>
  );
};

export default Profile;
