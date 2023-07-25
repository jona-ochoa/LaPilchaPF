const AccessDenied = () => {
    return (
      <div className="w-screen h-screen bg-black text-white flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-red-500">Access Denied</h1>
        <hr className="border-white w-1/2 md:w-1/3 my-4 animate-slide" />
        <h3 className="text-xl md:text-2xl lg:text-3xl text-center">You don't have permission to view this site.</h3>
        <h3 className="text-4xl md:text-5xl lg:text-6xl my-2 animate-pulse">🚫🚫🚫🚫</h3>
        <h6 className="text-xl md:text-2xl lg:text-3xl my-4 animate-pulse">error code: 403 forbidden</h6>
      </div>
    );
  };
  
  export default AccessDenied;