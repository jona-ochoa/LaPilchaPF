const mercadopago = require("mercadopago");
require("dotenv").config();
const MERCADOPAGO_TOKEN = process.env.MERCADOPAGO_TOKEN;
const User = require("../models/user");
const { ObjectId } = require("mongodb");

const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: MERCADOPAGO_TOKEN,
  });
  try {
    const { name, email, surname, buyOrder } = req.body;

    const items = buyOrder;
    const orderItems = [];

    for (const item of items) {
      const orderItem = {
        id: item.id,
        title: item.title,
        unit_price: item.unit_price,
        currency_id: "ARS",
        quantity: item.quantity,
      };

      orderItems.push(orderItem);
    }

    const buyerInfo = {
      name: name,
      surname: surname,
      email: email,
    };

    const result = await mercadopago.preferences.create({
      items: orderItems,
      back_urls: {
        pending: "http://localhost:3002/pay/pending",
        success: "http://localhost:3000/success",
        failure: "http://localhost:3002/pay/failure",
      },
      notification_url: "https://44c8-179-0-233-162.ngrok-free.app/pay/webhook",
      payment_methods: {
        installments: 3, //hasta 3 cuotas
      },
      payer: buyerInfo,
    });

    res.status(200).send(result.body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const reciveWebhook = async (req, res) => {
  try {
    const payment = req.query;

    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);

      const body = data.body;
      const compra = {
        idPay: body.id,
        date: body.date_approved,
        amount: body.transaction_amount,
        paymentType: body.payment_type_id,
      };

      const usuarioId = body.additional_info.payer.last_name;

      const usuarioObjectId = new ObjectId(usuarioId);
      const usuario = await User.findById(usuarioObjectId);
      if (usuario) {
        usuario.buyhistory.push(compra);
        await usuario.save();
        console.log("Informacion correctamente guardada en la base de datos");
      } else {
        console.log("Usuario no encontrado en la base de datos");
      }
    }

    res.status(200).json({ ok: "Todo OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, reciveWebhook };
