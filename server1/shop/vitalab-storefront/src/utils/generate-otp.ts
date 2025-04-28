export const generateOTP = () => {
  const length = parseInt(process.env.OTP_LENGTH || "4", 10)
  const chars = process.env.OTP_CHARS || "0123456789"
  let otp = ""

  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)]
  }

  return otp
}
