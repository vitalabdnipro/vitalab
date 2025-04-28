// export const saveOrder = async (data) => {
//   await fetch(`/api/orders/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
// };

export const createPatient = async (data) => {
  await fetch(`/api/patients/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
