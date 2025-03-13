// export function json_to_base64(str: string) {
//   return btoa(decodeURIComponent(encodeURIComponent(str)))
// }

export const jsonToBase64 = (str: string) => {
  const utf8Data = Buffer.from(str, "utf8")
  const base64Data = utf8Data.toString("base64")

  return base64Data
}
