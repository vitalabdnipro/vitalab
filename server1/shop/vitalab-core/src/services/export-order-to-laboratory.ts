import {
  OrderStatus,
  PaymentStatus,
  TransactionBaseService,
} from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { BaseService } from "medusa-interfaces";
import { OrderService } from "@medusajs/medusa";
import axios from "axios";
import laboratories from "../../data/export_order_to_laboratory.json";

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
