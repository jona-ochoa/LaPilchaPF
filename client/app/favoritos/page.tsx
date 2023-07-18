import React from "react";
import Favoritos from "components/Favoritos";


const FavoritosPage = () =>{
    return(
        <div>
            <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-800 py-2 text-center"> TUS PRENDAS FAVORITAS </h1>
                <Favoritos/>
        </div>
    )
}


export default FavoritosPage;