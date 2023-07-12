const mercadopago = require("mercadopago");
require("dotenv").config();
const MERCADOPAGO_TOKEN = process.env.MERCADOPAGO_TOKEN;

const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: MERCADOPAGO_TOKEN,
  });

  //Recibe info por req.body
  //Solo dejar hasta 3 cuotas sin interes
  //Pasar info de payer:{}
  //tiene que pasar la notification url a un servidor https
  // entorno configurado con ssl
  // el ejecutable ngrok crea un tunel http, osea te da un donimio ssl en tu local host
  // notification_url: "http://localhost:3002/webhook", tiene que ser un dominio https, no pude hacewr funcionar ngrok, intente con localhost.run y tampoco
  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "Laptop DELL",
        unit_price: 150,
        currency_id: "ARS",
        quantity: 1,
      },
    ],
    back_urls: {
      pending: "http://localhost:3002/pending",
      success: "http://localhost:3002/success",
      failure: "http://localhost:3002/failure",
    },
    notification_url: "https://bd97-179-0-233-188.ngrok-free.app/webhook",
  });
  console.log(result);
  res.send(result.body);
};

const reciveWebhook = async (req, res) => {
  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
      //aca guardar en historial en DB
    }
    res.status(204).send("Todo OK");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, reciveWebhook };
