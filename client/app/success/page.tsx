import Link from "next/link";
import Image from "next/image";
import logoanimado from "../../public/LaPilcha_animada.gif";

const ThankYouPage = () => {
  return (
    <div className="flex flex-col justify-center justify-items-center py-1.5 bg-cyan-100">
      <div className="flex flex-row flex-wrap justify-center justify-items-center mx-2.5">
        <div
          className="w-1/4"
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          <Image
            src={logoanimado}
            alt="La Pilcha"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="w-auto flex flex-col flex-wrap justify-center justify-items-center text-5xl mx-8 py-3.5 font-semibold">
          <h2>Gracias por elegirnos!</h2>
          <h3 className="mt-3.5">Compra realizada con éxito.</h3>
        </div>
      </div>
      <Link
        href="/"
        className="mx-auto m-3 w-44 h-20 mt-6  rounded-md bg-blue-500 py-2.5 text-lg font-medium text-blue-50 hover:bg-blue-600 flex justify-center items-center"
      >
        <button>Seguir comprando</button>
      </Link>
    </div>
  );
};

export default ThankYouPage;
