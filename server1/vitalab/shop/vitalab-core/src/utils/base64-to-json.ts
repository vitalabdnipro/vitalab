export function base64ToJson(str: string) {
  const decodedString = Buffer.from(str, "base64").toString("utf-8");
  const json = JSON.parse(decodedString);

  return json;
}
