import { medusaClient } from "@lib/config";

const Analysis = () => {
  // console.log(analysis);
  return (
    <div>
      {/* <div className="">{analysis[0].handle}</div> */}
    </div>
  );
};

// export async function getStaticPaths() {
//   const response = await medusaClient.products.list({ limit: 1 });

//   return {
//     paths: response.products.map((id) => ({ params: { id: id.handle } })),
//     fallback: false, // can also be true or 'blocking'
//   };
// }

// export async function getStaticProps({ params }) {
//   // console.log(params.id);
//   const a = await medusaClient.products.list({
//     handle: params.id,
//   });
// //   console.log("aaaaaaaaaaaaaaaa", a);
//   return {
//     props: {
//       analysis: { ...a.products },
//     }, // will be passed to the page component as props
//   };
// }

export default Analysis;
