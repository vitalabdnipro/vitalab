import ExportOrderToLaboratoryService from "../services/export-order-to-laboratory";
import EmailService from "../services/email";

class OrderSubscriber {
  private exportOrderToLaboratoryService_: ExportOrderToLaboratoryService;
  private emailService_: EmailService;

  constructor({
    exportOrderToLaboratoryService,
    emailService,
    eventBusService,
  }) {
    this.exportOrderToLaboratoryService_ = exportOrderToLaboratoryService;
    this.emailService_ = emailService;

    eventBusService.subscribe(
      "order.placed",
      // async ({ id }) => await this.exportOrderToLaboratoryService_.export(id)
      this.handleEvent
    );

    eventBusService.subscribe(
      "order.payment_captured",
      this.handleEvent
      // async ({ id }) => await this.exportOrderToLaboratoryService_.export(id)
    );
  }

  handleEvent = async ({ id }) => {
    const res = await this.exportOrderToLaboratoryService_.export(id);
    
    console.log("handleEvent", res);

    if (res.email) {
      this.emailService_.send(id);
    }
  };
}

// createFulfillmentFromGoodsOut = ({ id }) => {
//   return this.brightpearlService_.createFulfillmentFromGoodsOut(id);
// };

export default OrderSubscriber;
