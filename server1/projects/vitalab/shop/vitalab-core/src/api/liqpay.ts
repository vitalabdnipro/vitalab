import bodyParser from "body-parser";
import { createSignature } from "../utils/create-signature";
import { base64ToJson } from "../utils/base64-to-json";
import { EntityManager } from "typeorm";
import OrderRepository from "@medusajs/medusa/dist/repositories/order";
import { Order } from "@medusajs/medusa";

export default (router) => {
  router.use(bodyParser.urlencoded({ extended: false }));

  router.post("/liqpay/callback", async (req, res) => {
    const apiKey = req.query.apiKey;
    const orderService = req.scope.resolve("orderService");
    const manager: EntityManager = req.scope.resolve("manager");
    const orderRepository = manager.withRepository(OrderRepository);

    if (apiKey !== "pk_01H111QK2FNA1E4P6BJR1S2BQR") {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    try {
      const { data, signature } = req.body;
      const isSignatureValid = createSignature(data) === signature;

      console.log("isSignatureValid", isSignatureValid);
      console.log("data", data);
      console.log("signature", signature);

      if (isSignatureValid) {
        const payment = base64ToJson(data);

        // const order = await orderRepository.findOne({
        //   where: {
        //     external_id: dataObject.order_id, //"3330000188"
        //   },
        // });

        console.log("payment", payment);
        if (payment) {
          const order = await orderService.retrieve(payment.order_id);
          console.log("order retrieved", order);
          if (order && order.payment_status === "captured") {
            console.log("order already captured");
            res.status(200).json({ message: "order already captured" });
            return;
          } else if (payment.status === "success") {
            const res = await orderService.capturePayment(payment.order_id);
            res.status(200).json(res);
          }
          //TODO: send email to manager
        }

        res.status(404).json({ error: "order not found" });
      }
    } catch (error) {
      console.log("error", error);
      res.status(400).json({
        message: error.message,
      });
      // return;
    }
  });

  router.post("/liqpay", async (req, res) => {
    const apiKey = req.query.apiKey;
    const orderService = req.scope.resolve("orderService");
    const manager: EntityManager = req.scope.resolve("manager");
    const orderRepository = manager.withRepository(OrderRepository);

    if (apiKey !== "pk_01H111QK2FNA1E4P6BJR1S2BQR") {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    try {
      const { data, signature } = req.body;
      const isSignatureValid = createSignature(data) === signature;

      if (isSignatureValid) {
        const payment = base64ToJson(data);

        // const order = await orderRepository.findOne({
        //   where: {
        //     external_id: dataObject.order_id,
        //   },
        // });

        const status = payment.status === "success" ? "confirmed" : "error";

        const url = new URL(
          `/order/${status}/${payment.order_id}`,
          "https://vitalab.com.ua"
        );

        res.redirect(url);
        return router;
      }
      res.status(200).json({ message: "invalid signature" });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
      // return;
    }
  });

  return router;
};
