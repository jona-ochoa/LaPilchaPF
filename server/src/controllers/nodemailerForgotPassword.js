const nodemailer = require("nodemailer");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
// const User = require("../models/user")

const generatedEmailContent = (data) => {
    const resetLink = `http://localhost:3000/resetPassword?token=${data.token}`;
    const imageLogo = "https://i.ibb.co/qp8j5R5/logo-White.png";
    const emojiHand = "https://www.emojiall.com/images/animations/joypixels/64px/waving_hand.gif"

    return {
        text: `Hola, ${data.username}! Haz click en el siguiente enlace para reestablecer tu contraseña:\n${resetLink}`,
        html: ` 
        <div style="text-align: center; background-color: #4F759B; padding: 20px; border-radius: 8px;">
    <table cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
            <td style="background-color: white; padding: 8px; border-radius: 50%;">
                <img src="${imageLogo}" alt="logoImage" width="100" height="100" />
            </td>
        </tr>
        <tr>
            <td>
                <h1 style="color: #F2E9E4; font-size: 24px; font-weight: bold; margin: 16px 0;">
                    Hola, ${data.username}! <img src="${emojiHand}" style="width: 24px; height: 24px; vertical-align: middle;" />
                </h1>
            </td>
        </tr>
        <tr>
            <td>
                <p style="font-size: 16px;">Haz click en el siguiente enlace para reestablecer tu contraseña:</p>
            </td>
        </tr>
        <tr>
            <td>
                <a style="display: block; background-color: #007bff; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; text-align: center;" href="${resetLink}">Reestablecer contraseña</a>
            </td>
        </tr>
    </table>
</div>`  
    }
};

const sendEmailForgotPassword = async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    console.log("received email: ", email);
    //se genera un token unico
    const token = uuidv4();
    const emailAuth = process.env.NODE_EMAIL_PRUEBA;
    const pass = process.env.NODE_PASS_PRUEBA;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "user no encontrado." });
      }
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailAuth,
          pass,
          method: "PLAIN",
        },
      });
      const mailOptions = {
        from: email,
        to: `${email}`,
        subject: "Recuperación de contraseña",
        ...generatedEmailContent({ email, username: user.name, token }),
      };
  
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ data: { message: "correo enviado con éxito!" } });
    } catch (error) {
      return res.status(400).json({ data: { message: error.message } });
    }
  };
  
  module.exports = sendEmailForgotPassword;