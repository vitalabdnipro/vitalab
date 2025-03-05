import { OrderService, TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { transporter } from "../utils/nodemailer";

const sendEmail = (prepare) => {
  return new Promise((resolve, reject) => {
    try {
      const email = prepare();
      console.log("email", email as any);
      resolve(email);
    } catch (e) {
      reject(console.error(`sendEmail failed`, e));
    }
  });
};

class EmailService extends TransactionBaseService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager;
  protected orderService_: OrderService;

  constructor(container) {
    super(container);
    this.orderService_ = container.orderService;
  }

  async send(id) {
    const order = await this.orderService_.retrieve(id, {
      select: ["shipping_total", "subtotal", "total"],
      relations: ["customer", "shipping_address", "discounts", "payments"],
    });

    const emailsToSend: Promise<unknown>[] = [];
    // console.log("order", order);

    const list = order.items.map((item) => {
      return {
        code: item.variant.mid_code,
        text: `<tr>
        <td data-id="__react-email-column" style="padding-left:22px;padding-bottom:6px">
          <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;font-weight:600;padding:0">${
            item.title
          }</p>
          <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;color:rgb(102,102,102);padding:0">Код: ${
            item.variant.mid_code
          }</p>
        </td>
        <td align="right" data-id="__react-email-column" style="display:table-cell;padding:0px 20px 0px 0px;width:100px;vertical-align:top">
          <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:0;font-weight:600">${
            item.total / 100
          } грн</p>
        </td>
      </tr>`,
      };
    });

    emailsToSend.push(
      sendEmail(() =>
        transporter.sendMail({
          from: "vitalab@vitalab.com.ua",
          to: `${order.customer.email}`, //`${order.customer.email}`,
          subject: `VitaLab - Замовлення: #${(
            3330011000 + order.display_id
          ).toString()} (vitalab.com.ua)`,
          text: "_",
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <html lang="uk">

            <head data-id="__react-email-head">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <title>Vitalab</title>
            </head>

            <body data-id="__react-email-body" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;background-color:#ffffff">
              <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:660px">
                <tbody>
                  <tr style="width:100%">
                    <td>
                      <table width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                        <tbody>
                          <tr>
                            <td>
                            <td data-id="__react-email-column"><h1 style="font-size:28px;color:#336600;margin-right:100px">Vitalab</h1></td>
                            <td align="right" data-id="__react-email-column" style="display:table-cell">
                              <p data-id="react-email-text" style="font-size:28px;line-height:24px;margin:16px 0;font-weight:300;color:#888888">#${(
                                3330011000 + order.display_id
                              ).toString()}</p>
                            </td>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                <tbody>
                  <tr>
                    <td>
                      <p data-id="react-email-text" style="font-size:13px;line-height:24px;margin:36px 0 40px 0;text-align:center;font-weight:500;color:#111111">Дякуємо за інтерес до послуг VitaLab.<br />Ваше замовлення отримано та надійде в обробку найближчим часом<br />Для перегляду Вашого замовлення перейдіть за <a href="https://vitalab.com.ua/order/confirmed/${
                        order.id
                      }" data-id="react-email-link" target="_blank" style="color:#067df7;text-decoration:none">посиланням</a></p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" width="100%" data-id="react-email-section" style="border-collapse:collapse;border-spacing:0px;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" width="100%" data-id="react-email-row" style="height:46px" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td colSpan="1" data-id="__react-email-column">
                              <table align="left" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                                <tbody style="width:100%">
                                  <tr style="width:100%" align="left">
                                    <td data-id="__react-email-column" style="padding-left:20px;height:44px">
                                      <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102);width:300px">ДАТА ЗАМОВЛЕННЯ</p><p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0">${order.created_at.toLocaleString(
                                        "uk-UA",
                                        {
                                          timeZone: "Europe/Kiev",
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                          hour: "numeric",
                                          minute: "numeric",
                                          second: "numeric",
                                          hour12: false,
                                        }
                                      )}</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table align="left" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                                <tbody style="width:100%">
                                  <tr style="width:100%" align="left">
                                    <td data-id="__react-email-column" style="padding-left:20px;height:44px">
                                      <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">СТАТУС ЗАМОВЛЕННЯ</p>
                                      <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0;padding-right:20px">${
                                        order.payments[0].captured_at
                                          ? `<span style="color:green">Сплачено</span>`
                                          : "Чекає на оплату"
                                      }</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table align="left" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                                <tbody style="width:100%">
                                  <tr style="width:100%" align="left">
                                    <td data-id="__react-email-column" style="padding-left:20px;height:44px">
                                      <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">СПОСІБ ОПЛАТИ</p><p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0;padding-right:20px">${
                                        order.payments[0].provider_id ===
                                        "manual"
                                          ? "Оплата у пункті забору біоматеріалу"
                                          : "Оплата карткою Visa / MasterCard (Liqpay)"
                                      }</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" width="100%" data-id="react-email-section" style="border-collapse:collapse;border-spacing:0px;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px;margin:30px 0 15px 0;height:24px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                <tbody>
                  <tr>
                    <td>
                      <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:0;background:#fafafa;padding-left:10px;font-weight:500">Дослідження</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                <tbody>
                   ${list.map((item) => item.text).join("")}
                </tbody>
              </table>
              <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;margin:30px 0 0 0" />
              <table align="right" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                <tbody>
                  <tr>
                    <td>
                    <td align="right" data-id="__react-email-column" style="display:table-cell">
                      <p data-id="react-email-text" style="font-size:10px;line-height:24px;margin:0;color:rgb(102,102,102);font-weight:600;padding:0px 30px 0px 0px;text-align:right">РАЗОМ</p>
                    </td>
                    <td data-id="__react-email-column" style="height:48px;border-left:1px solid;border-color:rgb(238,238,238)"></td>
                    <td data-id="__react-email-column" style="display:table-cell;width:120px">
                      <p data-id="react-email-text" style="font-size:16px;line-height:24px;margin:0px 20px 0px 0px;font-weight:600;white-space:nowrap;text-align:right">${
                        order.total / 100
                      } грн</p>
                    </td>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;margin:0 0 35px 0" />
              <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                <tbody>
                  <tr>
                    <td>
                    <td align="left" data-id="__react-email-column" style="display:block;margin:0 0 0 24px">
                      <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;font-weight:400">Інструкції:<br /> Одержувач платежу:<br /> Найменування організації: ТОВ ДЛЦ ВIТАЛАБ ТОВ<br /> Код отримувача: 42031591<br /> Назва банку: АТ КБ &#x27;ПРИВАТБАНК&#x27;<br /> Рахунок отримувача: IBAN UA853052990000026001050307302<br /> Валюта: UAH<br /> Код Банку (МФО): 305299</p>
                    </td>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;margin:35px 0 20px 0" />
              <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:25px 0 0 0;text-align:center;color:rgb(102,102,102)">© 2023 Vitalab <br /> <a href="https://vitalab.com.ua" data-id="react-email-link" target="_blank" style="color:#067df7;text-decoration:none">Всі права захищені</a></p>
              </td>
              </tr>
              </tbody>
              </table>
            </body>
          </html>`,
        })
      )
    );

    emailsToSend.push(
      new Promise((resolve, reject) => {
        try {
          resolve(
            transporter.sendMail({
              from: "vitalab@vitalab.com.ua",
              to: "info@vitalab.com.ua",
              subject: `VitaLab - Замовлення: #${(
                3330011000 + order.display_id
              ).toString()} (vitalab.com.ua)`,
              text: "_",
              html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <html lang="uk">
    
                <head data-id="__react-email-head">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  <title>Vitalab</title>
                </head>
    
                <body data-id="__react-email-body" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;background-color:#ffffff">
                  <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:660px">
                    <tbody>
                      <tr style="width:100%">
                        <td>
                          <table width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td>
                                <td data-id="__react-email-column"><h1 style="font-size:28px;color:#336600;margin-right:100px">Vitalab</h1></td>
                                <td align="right" data-id="__react-email-column" style="display:table-cell">
                                  <p data-id="react-email-text" style="font-size:28px;line-height:24px;margin:16px 0;font-weight:300;color:#888888">#${(
                                    3330011000 + order.display_id
                                  ).toString()}</p>
                                </td>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table align="center" width="100%" data-id="react-email-section" style="border-collapse:collapse;border-spacing:0px;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px;margin-top:20px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" width="100%" data-id="react-email-row" style="height:46px" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td colSpan="1" data-id="__react-email-column">
                                  <table align="left" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                                    <tbody style="width:100%">
                                      <tr style="width:100%" align="left">
                                        <td data-id="__react-email-column" style="padding-left:20px;height:44px">
                                          <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102);width:300px">ДАТА ЗАМОВЛЕННЯ</p><p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0">${order.created_at.toLocaleString(
                                            "uk-UA",
                                            {
                                              timeZone: "Europe/Kiev",
                                              year: "numeric",
                                              month: "2-digit",
                                              day: "2-digit",
                                              hour: "numeric",
                                              minute: "numeric",
                                              second: "numeric",
                                              hour12: false,
                                            }
                                          )}</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table align="left" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                                    <tbody style="width:100%">
                                      <tr style="width:100%" align="left">
                                        <td data-id="__react-email-column" style="padding-left:20px;height:44px">
                                          <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">СТАТУС ЗАМОВЛЕННЯ</p>
                                          <p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0;padding-right:20px">${
                                            order.payments[0].captured_at
                                              ? `<span style="color:green">Сплачено</span>`
                                              : "Чекає на оплату"
                                          }</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table align="left" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                                    <tbody style="width:100%">
                                      <tr style="width:100%" align="left">
                                        <td data-id="__react-email-column" style="padding-left:20px;height:44px">
                                          <p data-id="react-email-text" style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102)">СПОСІБ ОПЛАТИ</p><p data-id="react-email-text" style="font-size:12px;line-height:1.4;margin:0;padding:0;padding-right:20px">${
                                            order.payments[0].provider_id ===
                                            "manual"
                                              ? "Оплата у пункті забору біоматеріалу"
                                              : "Оплата карткою Visa / MasterCard (Liqpay)"
                                          }</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table align="center" width="100%" data-id="react-email-section" style="border-collapse:collapse;border-spacing:0px;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px;margin:30px 0 15px 0;height:24px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td>
                          <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:0;background:#fafafa;padding-left:10px;font-weight:500">Дослідження</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                       ${list.map((item) => item.text).join("")}
                    </tbody>
                  </table>
                  <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;margin:30px 0 0 0" />
                  <table align="right" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td>
                        <td align="right" data-id="__react-email-column" style="display:table-cell">
                          <p data-id="react-email-text" style="font-size:10px;line-height:24px;margin:0;color:rgb(102,102,102);font-weight:600;padding:0px 30px 0px 0px;text-align:right">РАЗОМ</p>
                        </td>
                        <td data-id="__react-email-column" style="height:48px;border-left:1px solid;border-color:rgb(238,238,238)"></td>
                        <td data-id="__react-email-column" style="display:table-cell;width:120px">
                          <p data-id="react-email-text" style="font-size:16px;line-height:24px;margin:0px 20px 0px 0px;font-weight:600;white-space:nowrap;text-align:right">${
                            order.total / 100
                          } грн</p>
                        </td>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea" />
                  <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:25px 0 0 0;text-align:center;color:rgb(102,102,102)">© 2023 Vitalab <br /> <a href="https://vitalab.com.ua" data-id="react-email-link" target="_blank" style="color:#067df7;text-decoration:none">Всі права захищені</a></p>
                  </td>
                  </tr>
                  </tbody>
                  </table>
                </body>
              </html>`,
            })
          );
        } catch (e) {
          reject(console.error(`sendMail failed`, e));
        }
      })
    );

    Promise.all(emailsToSend).then((value) => {
      console.log(value);
    });
  }
}

export default EmailService;
