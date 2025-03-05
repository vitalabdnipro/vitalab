export const sendOrderLab = async (data) => {
  await fetch(`/api/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
