export const generateOTP = () => {
  const length = 4;
  const chars = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }

  return otp;
};
