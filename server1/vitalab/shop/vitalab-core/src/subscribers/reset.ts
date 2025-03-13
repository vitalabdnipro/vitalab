import { transporter } from "../utils/nodemailer";

class ResetPasswordSubscriber {
  constructor({ eventBusService }) {
    eventBusService.subscribe(
      "customer.password_reset",
      this.handleResetPassword
    );
  }

  handleResetPassword = async (data) => {
    console.log(data);
    const { email, token } = data;
    
    await transporter.sendMail({
      from: "vitalab@vitalab.com.ua",
      to: email,
      subject: `Запит на скидання пароля до особистого кабінету VitaLab`,
      text: "_",
      html: `<!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Vitalab</title>
        </head>
        <body style="width:680px;">
          <div>
            <p>Ми отримали запит на скидання пароля для облікового запису VitaLab, пов’язаного з ${email}.</p>
            <a href="https://vitalab.com.ua/account/reset?token=${token}">Скинути пароль</a>
            <p>Якщо ви не надсилали запит на скидання пароля, ігноруйте цей лист. У ваш обліковий запис ще не внесено жодних змін.
          </div>
        </body>
      </html>`,
    })
  };
}

export default ResetPasswordSubscriber;
