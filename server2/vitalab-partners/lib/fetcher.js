// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default async function fetcher(input, init) {
  const res = await fetch(input, init);
  return res.json();
}

// export default async function fetcher(input, init) {
//   const res = await fetch(input, init);
//   return res.json();
// }
// export default async function fetcher(input, init) {
//   const res = await fetch(input, init);
//   return res.json();
// }

// export default async function fetcher(url, query, { variables } = {}) {
//   const API_URL = "https://10.8.0.1";

//   const res = await fetch(`${API_URL}/${url}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   const json = await res.json();
//   if (json.errors) {
//     console.error(json.errors);
//     throw new Error("Failed to fetch API");
//   }

//   return json.data;
// }

// export default async function fetcher() {
//   const API_URL = "terra-lab.json";

//   const res = await fetch(`${API_URL}`);

//   const json = await res.json();

//   if (json.errors) {
//     console.error(json.errors);
//     throw new Error("Failed to fetch API");
//   }

//   return json.data;
// }
