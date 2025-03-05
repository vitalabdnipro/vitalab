import {
  Product,
  ProductService,
  ProductStatus,
  SalesChannelService,
  ShippingProfileService,
  PriceListService,
  SearchService,
} from "@medusajs/medusa";
import e from "express";
import _ from "lodash";

const arrayLIS = [
  {
    id: "a185a00582f144688bef27a712f88033",
    code: "242",
    name: "25-гідроксікальциферол (25-ОН-D)",
    category_name: "Діагностика остеопорозу",
    category_id: "36",
    price: 35700,
    base_price: 42000,
    description: "Вітамін D",
    type: "TEST",
    container_name: "з активатором згортання або гелем",
    container_color: "FFFF00",
    is_active: 1,
    days: 2,
    manipulation_id: "937",
    manipulation_name: "Забір біоматеріалу (крові)",
    category_tree: { category: [Object] },
  },
  {
    id: "178",
    code: "243",
    name: "Паратгормон1",
    category_name: "Діагностика остеопорозу",
    category_id: "36",
    price: 19800,
    base_price: 22000,
    description: "Паратгормон",
    type: "TEST",
    container_name: "з активатором згортання або гелем",
    container_color: "FFFF00",
    is_active: 1,
    days: 1,
    manipulation_id: "937",
    manipulation_name: "Забір біоматеріалу (крові)",
    category_tree: { category: [Object] },
  },
  {
    id: "a8aa7884351e4c2781f70a88266d1f9b",
    code: "290",
    name: "Вірус кору, антитіла IgG",
    category_name: "Вірус кору",
    category_id: "20620d84cc1c468e9d4f5f1c5a043ec6",
    price: 20400,
    base_price: 24000,
    description: "",
    type: "TEST",
    container_name: "з активатором згортання або гелем",
    container_color: "FFFF00",
    is_active: 1,
    days: 3,
    manipulation_id: "937",
    manipulation_name: "Забір біоматеріалу (крові)",
    category_tree: { category: [Object] },
  },
];

export default (router) => {
  router.get("/test", async (req, res) => {
    // const orderService = req.scope.resolve("orderService");
    // const emailService = req.scope.resolve("emailService");
    const categoryService = req.scope.resolve("categoryService");

    const resCategories = await fetch(
      `http://mirthout.vitalab.com.ua:55080/labs/get_price_list_grp`,
      {
        method: "POST",
        body: JSON.stringify({
          query: {
            org_id: "e45c0e05f4e74043ad5327664d8e3ad1",
            filter: null,
          },
        }),
      }
    );

    const categories = await resCategories.json();

    const categoryPromises = categories.data.items.map(
      async (category: any) => {
        console.log("category", category.name);
        const exist = await categoryService.find(category.name);
        if (exist.length === 0) {
          console.log("not exist", category.name);
          const x = await categoryService.create(category);
          console.log("x", x);
        }
        // if (exist.length > 0) {
        //   await categoryService.createCollection({
        //     title: exist[0].name,
        //     handle: exist[0].id,
        //   });
        // }

        // if (exist.length <= 0) {
        //   return await categoryServiceTx.create(category);
        // }
      }
    );

    await Promise.all(categoryPromises);
    // const order = await orderService.retrieve(
    //   "order_01H8B81Q41BDNFC1C010K5YZZ3",
    //   {
    //     select: ["shipping_total", "subtotal", "total"],
    //     relations: ["customer", "shipping_address", "discounts", "payments"],
    //   }
    // );

    // const resx = await emailService.send("order_01H93YXY0PT16PCT7XFCN0R51Z");

    // console.log("order:", resx);
    // const response = await fetch(
    //   `http://mirthout.vitalab.com.ua:55080/labs/get_price_list/`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       query: {
    //         org_id: "e45c0e05f4e74043ad5327664d8e3ad1",
    //         filter: null,
    //       },
    //     }),
    //   }
    // );
    // const priceList = await response.json();

    // const productService = req.scope.resolve("productService");
    // const [data, count] = await productService.listAndCount(
    //   // { status: ProductStatus.PUBLISHED },
    //   {},
    //   { take: 5 }
    // );

    // const searchListPromises = await data.map(async (product) => {
    //   console.log("product", product.id);

    //   if (product.status === ProductStatus.PUBLISHED) {
    //     const search = await searchService.addDocuments(
    //       ProductService.IndexName,
    //       [product],
    //       indexTypes.products
    //     );
    //     // console.log(search);
    //   } else {
    //     const deleted = await searchService.deleteDocument(
    //       ProductService.IndexName,
    //       product.id
    //     );
    //   }
    // });
    // console.log(searchListPromises);
    // const categoryService = req.scope.resolve("categoryService");
    // const productCollectionService = req.scope.resolve(
    //   "productCollectionService"
    // );

    // const exist = await productCollectionService
    //   .retrieveByHandle("9")
    //   .then((res) => console.log("555", res))
    //   .catch((err) => console.log("xxxx", err));

    // console.log("existxxxxxxxxxxxxxx", exist);

    // const test = await categoryService.find("Паразитарні інфекції");
    // console.log("test", test);
    // try {
    //   const collection = await categoryService.createCollection({
    //     title: test[0].name,
    //     handle: test[0].id,
    //   });
    //   console.log("collection", collection);

    //   const update = await categoryService.update(91, collection.id);

    //   console.log("update", update);
    // } catch (error) {
    //   console.log("xxx", error);
    // }

    // const x = await productCollectionService.addProducts(collection.id, [
    //   "prod_01H4F1RV2FW5VFQWNXZ2W4SQ92",
    // ]);

    // console.log("x", x);

    // const cat = await categoryService.create({ name: "test", id: "1200", code: "1200C", parentid: "1200B", order: "400" });
    // console.log("caaaaaaaaaaat",cat)
    // const products = await productService.list({}, { limit: 3 });

    // const payload = {
    //   title: arrayLIS[0].name,
    //   subtitle: null,
    //   // description: null,
    //   // handle: id,
    //   is_giftcard: false,
    //   status: arrayLIS[0].is_active
    //     ? ProductStatus.PUBLISHED
    //     : ProductStatus.DRAFT,
    //   thumbnail: null,
    //   profile_id: 0,
    //   weight: 400,
    //   length: null,
    //   height: null,
    //   width: null,
    //   hs_code: null,
    //   origin_country: null,
    //   mid_code: arrayLIS[0].code ? arrayLIS[0].code : null,
    //   material: null,
    //   collection_id: null,
    //   discountable: true,
    //   metadata: {
    //     manipulation_id: arrayLIS[0].manipulation_id
    //       ? arrayLIS[0].manipulation_id
    //       : "0",
    //   },
    // };

    // const revalidateList = [];

    // await Promise.all(
    //   arrayLIS.map(async (item) => {
    //     const category = await categoryService.findByCode(item.category_id);

    //     const payload = {
    //       id: item.id,
    //       code: item.code,
    //       name: item.name,
    //       // category_name: "Вірус кору",
    //       // category_id: "20620d84cc1c468e9d4f5f1c5a043ec6",
    //       // price: 20400,
    //       base_price: item.base_price,
    //       is_active: item.is_active,
    //       manipulation_id: item.manipulation_id,
    //       // category_tree: { category: [Object] },
    //     };

    //     try {
    //       const research = await productService
    //         .retrieveByExternalId(item.id, {
    //           relations: ["variants.prices"],
    //         })
    //         .then((res) => {
    //           return {
    //             id: res.external_id,
    //             code: res.mid_code,
    //             name: res.title,
    //             // category_name: "Вірус кору",
    //             // category_id: "20620d84cc1c468e9d4f5f1c5a043ec6",
    //             // price: 20400,
    //             base_price: res.variants[0].prices[0].amount,
    //             is_active: res.status === ProductStatus.PUBLISHED ? 1 : 0,
    //             manipulation_id: res.metadata.manipulation_id,
    //             // category_tree: { category: [Object] },
    //           };
    //         });

    //       console.log("research", research);
    //       console.log("payload", category[0].id);

    //       if (_.isEqual(payload, research)) {
    //         revalidateList.push(category[0].id);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   })
    // );
    // // const test = await Promise.all(revalidateList);

    // console.log("revalidateList", revalidateList);

    // await fetch(
    //   "http://localhost:8000/api/revalidate3?secret=ZEwIIbZg7ICGOjd3SN0M",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(revalidateList),
    //   }
    // );
    // // console.log("products", payload);
    // // console.log("my products", products);
    // // let filteredList = products.filter((o1) => {
    // //   if (o1.status === ProductStatus.DRAFT) {
    // //     console.log("o1", o1.status);
    // //   }
    // //   return !priceList.data.items.some((o2) => o2.id === o1.external_id);
    // // });

    // // filteredList.forEach(async (product) => {
    // //   console.log("product", product);
    // //   await productService.update(product.id, {
    // //     // status: ProductStatus.DRAFT,
    // //   });
    // // });

    res.json({ success: true });
  });
};
