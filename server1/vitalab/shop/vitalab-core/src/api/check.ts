import { FulfillmentStatus, OrderService, OrderStatus } from "@medusajs/medusa";
import ExportOrderToLaboratoryService from "../services/export-order-to-laboratory";
import EmailService from "../services/email";
import { EntityManager } from "typeorm";

export default (router) => {
  router.get("/check", async (req, res) => {
    const orderService: OrderService = req.scope.resolve("orderService");
    const exportOrderToLaboratoryService: ExportOrderToLaboratoryService =
      req.scope.resolve("exportOrderToLaboratoryService");
    const emailService: EmailService = req.scope.resolve("emailService");
    const entityManager: EntityManager = req.scope.resolve("manager");

    const orders = await orderService.list(
      { status: OrderStatus.PENDING },
      {
        take: 5,
        skip: 0,
        order: { created_at: "DESC" },
        relations: ["payments"],
      }
    );

    if (orders.length > 0) {
      await entityManager.transaction(async (manager) => {
        const orderServiceTx = orderService.withTransaction(manager);
        const exportOrderToLaboratoryServiceTx =
          exportOrderToLaboratoryService.withTransaction(manager);
        const emailServiceTx = emailService.withTransaction(manager);

        const promises = orders.map(async (order: any) => {
          const isPayed =
            order.payment_status === "captured" &&
            order.payments[0].provider_id === "liqpay";

          const isCompleted = order.status === OrderStatus.COMPLETED;

          if (isPayed && !isCompleted) {
            const res = await exportOrderToLaboratoryServiceTx.export(order.id);
            console.log(res);

            if (res.email) {
              emailServiceTx.send(order.id);
            }
          } else if (
            order.payments[0].provider_id !== "liqpay" &&
            !isCompleted
          ) {
            const res = await exportOrderToLaboratoryServiceTx.export(order.id);
            console.log(res);

            if (res.email) {
              emailServiceTx.send(order.id);
            }
          }
        });

        await Promise.all(promises);
      });
    }
    // console.log("orders", orders);
    res.json({
      orders,
    });
  });

  return router;
};
