import {
  AbstractPaymentProcessor,
  PaymentProcessorContext,
  PaymentProcessorError,
  PaymentProcessorSessionResponse,
  PaymentSessionStatus,
} from "@medusajs/medusa";

class LiqpayPaymentProcessor extends AbstractPaymentProcessor {
  static identifier = "liqpay";

  async capturePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    // throw new Error("capturePayment not implemented.");
    return {
      status: "captured",
    };
  }
  async authorizePayment(
    paymentSessionData: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<
    | PaymentProcessorError
    | {
        status: PaymentSessionStatus;
        data: Record<string, unknown>;
      }
  > {
    // throw new Error("authorizePayment not implemented.");
    return {
      status: PaymentSessionStatus.AUTHORIZED,
      data: {
        id: "test",
      },
    };
  }
  async cancelPayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    // throw new Error("cancelPayment not implemented.");
    return {
      id: "test",
    };
  }
  async initiatePayment(
    context: PaymentProcessorContext
  ): Promise<PaymentProcessorError | PaymentProcessorSessionResponse> {
    // throw new Error("initiatePayment not implemented.");
    return {
      session_data: {
        id: "123",
      },
      update_requests: {},
    };
  }
  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    // throw new Error("deletePayment not implemented.");
    return paymentSessionData;
  }
  async getPaymentStatus(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentSessionStatus> {
    console.log("getPaymentStatus", paymentSessionData);
    // throw new Error("getPaymentStatus not implemented.");
    return PaymentSessionStatus.AUTHORIZED;
  }
  async refundPayment(
    paymentSessionData: Record<string, unknown>,
    refundAmount: number
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    return {
      id: "test",
    };
  }
  async retrievePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    // throw new Error("retrievePayment not implemented.");
    return {};
  }
  async updatePayment(
    context: PaymentProcessorContext
  ): Promise<void | PaymentProcessorError | PaymentProcessorSessionResponse> {
    // throw new Error("updatePayment not implemented.");
    return {
      session_data: {},
      update_requests: {},
    };
  }
  async updatePaymentData(
    sessionId: string,
    data: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    return data;
  }
}

export default LiqpayPaymentProcessor;
