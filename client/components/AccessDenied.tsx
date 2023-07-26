import Link from "next/link"

const AccessDenied = () => {
    return (

      <div className="w-screen h-screen bg-white text-black flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-red-500">ACCESO DENEGADO</h1>
        <hr className="border-white w-1/2 md:w-1/3 my-4 animate-slide" />
        <h3 className="text-xl md:text-2xl lg:text-3xl text-center">No tienes permiso para ver este sitio</h3>
        <h3 className="text-4xl md:text-5xl lg:text-6xl my-2 animate-pulse">🚫🚫🚫🚫</h3>
        <h6 className="text-xl md:text-2xl lg:text-3xl my-4 animate-pulse"> -403 prohibido-</h6>
        <div className="flex justify-center items-center h-screen">
          <div className="inline-block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
      <Link href="/login">
          Loguearse con otra cuenta
      </Link>
          </div>
    </div>
      </div>
    );
  };
  
  export default AccessDenied;