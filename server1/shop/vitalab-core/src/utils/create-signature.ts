import crypto from "crypto";

export const createSignature = (data: string) => {
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;

  const signString = privateKey + data + privateKey;
  const sha1 = crypto.createHash("sha1");
  sha1.update(signString);
  const signature = sha1.digest("base64");

  return signature;
};
