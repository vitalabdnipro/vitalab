import {
  OrderStatus,
  PaymentStatus,
  TransactionBaseService,
} from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { BaseService } from "medusa-interfaces";
import { OrderService } from "@medusajs/medusa";
import axios from "axios";

const laboratories = [
  {
    // м Дніпро, вул. Херсонська, 10а (медичний центр), 3 поверх
    code: "9de5e61729e94322b3594779a272cd1b",
    id: "1",
    name: "Рецепція",
  },
  {
    // м Дніпро, вул. Ламана, 4, 1 поверх, каб. № 108
    code: "6633a3b5c6774d8597f91617136101e3",
    id: "2",
    name: "Центр",
  },
  {
    // м Дніпро, вул. Ламана, 4, 1 поверх, каб. № 108
    code: "f440304c3b6a42fc82bc08cb64943a46",
    id: "3",
    name: "Таблеткін",
  },
  {
    // м Дніпро, пр. Героїв, 22, 4 поверх
    code: "b2994c985a7d4bc180dbcfb433d2e957",
    id: "4",
    name: "Героїв, 22",
  },
  {
    // м. Дніпро, бульвар Слави 8, 1 поверх, вхід зі сторони бульвару
    code: "b0db1a0fc69b4a0d932b54cde6ccafac",
    id: "5",
    name: "Слава",
  },
  {
    // м. Дніпро, вул. Академіка Образцова 1
    code: "84b2e23f27264b96842e92c2ba2620d9",
    id: "6",
    name: "Образцова",
  },
  {
    // м. Дніпро, вул. Батумська, 13, 1 поверх
    code: "905965bc03d34e7495da36fa6755eb8c",
    id: "7",
    name: "Батумська,13",
  },
  {
    // м. Дніпро, пр. Пушкіна 26, педіатричний корпус, 1 поверх, каб. № 14
    code: "60e8528ceb10483aafe5f487ecf73293",
    id: "8",
    name: "Руднєва",
  },
  {
    // м. Дніпро, вул. Перемоги, 113, 1 поверх
    code: "c0b90b73e44a419b88976020b3e1b2ae",
    id: "9",
    name: "15",
  },
  {
    // м. Дніпро, ж/м Ігрень, вул. Бехтерева 1, приймальне відділення, 1 поверх
    code: "315f4edd7c8f4634ae16f07a80422fb6",
    id: "10",
    name: "Ігрень",
  },
  {
    // смт Слобожанське, вул. Будівельників, 16А
    code: "fc30c309a551449d81e532b963a2bfd4",
    id: "11",
    name: "Слобожанське",
  },
  {
    // м. Нікополь, вул. Пилипа Орлика, 46
    code: "b80b1122570c44ee83264d4718c96ec7",
    id: "12",
    name: "Нікополь",
  },
  {
    // смт. Кринички, вул. Героїв Чорнобиля, 22, 1 поверх, каб. #4
    code: "254e4a938f2f4712b3d1ea464c7984d1",
    id: "13",
    name: "Криничанська ЦРЛ",
  },
  {
    // смт. Солоне, вул. Усенко, 13, 2 поверх
    code: "41dbf06b194347679a9c65d92491797b",
    id: "14",
    name: "Солонянська ЦРЛ",
  },
  {
    // м. Дніпро, вул. Велика Діївська, 111, 1 поверх
    code: "6205ef6c926c4ab297a8824a862904c8",
    id: "15",
    name: "Покровський",
  },
  {
    // м. Дніпро, вул. Гавриленка, 1 (радіологічний корп., 1 поверх)
    code: "d93dfb00754248cf9ec96a4417b4455a",
    id: "16",
    name: "Гавриленка",
  },
  {
    // м. Дніпро, вул. Гавриленка, 1 (радіологічний корп., 1 поверх)
    code: "a559a2532df94d8c9f5dd73a2376f168",
    id: "17",
    name: "Подорожник",
  },
  {
    // м. Дніпро, пров. Вільний, 2А
    code: "0ff86cf029ec4e2ead509ab040cc8fc3",
    id: "18",
    name: "Вільний, 2А",
  },
  {
    // м. Дніпро, пр. Слобожанський, 60
    code: "7c4c491177454b16876df43ddb71c129",
    id: "19",
    name: "Калина",
  },
  {
    // м. Дніпро, пров. Фестивальний, 14
    code: "28b3cbad1b094f02aaf992e0039fcda5",
    id: "20",
    name: "Фестивальний",
  },
];

class ExportOrderToLaboratoryService extends TransactionBaseService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager;
  protected orderService_: OrderService;

  constructor(container) {
    super(container);
    this.orderService_ = container.orderService;
  }

  async export(orderId) {
    const order = await this.orderService_.retrieve(orderId, {
      select: ["shipping_total", "subtotal", "total"],
      relations: ["customer", "shipping_address", "discounts", "payments"],
    });

    console.log("order:", order.payments[0].provider_id);
    console.log("payment_status:", order.payment_status);

    if (
      order.payments[0].provider_id === "liqpay" &&
      order.payment_status !== "captured"
    ) {
      console.log("liqpay debug:", order.id);
      return { email: false };
    }

    console.log("order export:", order);
    const externalId: string = (3330011000 + order.display_id).toString();

    // if alert 2 fires, try adding no_notification

    await this.orderService_.update(orderId, {
      // @ts-ignore
      external_id: externalId,
    });

    const formatBirthday = (date) => {
      const parts = date.split(".");
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };

    const formatPhone = (phone) => {
      console.log("phone:", phone);
      console.log("phone mod:", phone.replace(/[\s\-()]/g, ""));

      return phone.replace(/[\s\-()]/g, "");
    };

    const laboratory = laboratories.find(
      (lab) => lab.id === order.metadata.laboratory
    );

    console.log("laboratory:", laboratory);

    const referral = {
      referral_data: {
        document_data: {
          ext_id: null,
          doc_num: externalId,
          descr: null,
          preg_week: null,
          menstrphase: null,
          diagnosis_code: null,
          policy_num: null,
          is_nczy: null,
        },
        patient_data: {
          ext_id: order.shipping_address.id,
          full_name: `${order.shipping_address.last_name} ${order.shipping_address.first_name} ${order.shipping_address.metadata.middle_name}`,
          // @ts-ignore
          sex: order.shipping_address.metadata.gender.toUpperCase(),
          // @ts-ignore
          birth_date: formatBirthday(order.shipping_address.metadata.birthday),
          phone: formatPhone(
            order.customer.phone
              ? order.customer.phone
              : order.shipping_address.phone
          ),
          email: order.customer.email,
          passport: null,
        },
        doctor_data: {
          ext_id: null,
          full_name: null,
          phone: null,
          email: null,
        },
        org_data: {
          ext_id: "0",
          name: null,
          email: null,
        },
        reception_subdivision: {
          ext_id: laboratory.code,
          name: laboratory.name,
        },
        tests: order.items.map((item) => ({
          ext_id: item.variant.product.external_id,
          id: item.variant.product.external_id,
          code: item.variant.product.mid_code,
          name: null,
          payload: item.id,
          descr: null,
          is_cito: 0,
        })),
      },
    };

    try {
      console.log("referral:", referral);
      // const response = await axios.post(
      //   "http://mirthOUT.vitalab.com.ua:55080/referral/create_referral",
      //   referral
      // );
      const response = await fetch(
        "http://mirthOUT.vitalab.com.ua:55080/referral/create_referral",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(referral),
        }
      );

      const json = await response.json();
      console.log("json:", json);

      let sendMail = false;

      if (json.status === "OK") {
        console.log("json.status", json.status);
        this.orderService_.completeOrder(order.id);
        sendMail = true;
      } else if (
        order.status !== OrderStatus.COMPLETED &&
        json.msg === "ORDER_ALREADY_EXISTS"
      ) {
        console.log("json.message", json.msg);
        this.orderService_.completeOrder(order.id);
        sendMail = true;
      } else if (
        order.payments[0].provider_id === "liqpay" &&
        order.payment_status === PaymentStatus.CAPTURED &&
        order.status !== OrderStatus.COMPLETED
      ) {
        console.log("liqpay debug:", order.payment_status);
        this.orderService_.completeOrder(order.id);
        sendMail = true;
      }

      console.log("sendMail:", sendMail);
      return { email: sendMail };
    } catch (error) {
      console.log(error);
    }
  }
}

export default ExportOrderToLaboratoryService;
