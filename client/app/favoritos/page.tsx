import React from "react";
import Favoritos from "components/Favoritos";


const FavoritosPage = () =>{
    return(
        <div>
            <h1 className="text-3xl font-bold text-center mb-6">❤️  <u>FAVORITOS</u> ❤️</h1>
                <Favoritos/>
        </div>
    )
}


export default FavoritosPage;