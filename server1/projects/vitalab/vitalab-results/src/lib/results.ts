export const getResults = async (id) => {
  if (id.length === 0) {
    return [];
  }
  
  const response = await fetch(
    "http://mirthOUT.vitalab.com.ua:55080/results/get_by_order_num",
    {
      method: "POST",
      headers: {
        token: "3cf9db27be144476b963e54889c1f127",
        "Content-Type": "application/json",
        // Accept: "application/json",
      },
      body: JSON.stringify({
        num: id,
        phone: null,
      }),
    }
  );

  const data = await response.json();

  return data;
};
