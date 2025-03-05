import {
  Product,
  ProductService,
  ProductStatus,
  SalesChannelService,
  ShippingProfileService,
  PriceListService,
  SearchService,
} from "@medusajs/medusa";
// import { CreateProductInput } from "@medusajs/medusa/dist/types/product";
import { EntityManager } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { indexTypes } from "medusa-core-utils";
import _ from "lodash";

const getСategory = (с) => {
  // console.log("data",n)
  if (с.category) {
    // console.log("if", n.id);
    return getСategory(с.category);
  } else {
    // console.log("else", n.id);
    return { name: с.name, id: с.id };
  }
};

export default (router) => {
  router.get("/hello", async (req, res) => {
    const productService: ProductService = req.scope.resolve("productService");
    const productVariantService = req.scope.resolve("productVariantService");
    const entityManager: EntityManager = req.scope.resolve("manager");
    const salesChannelService: SalesChannelService = req.scope.resolve(
      "salesChannelService"
    );
    const shippingProfileService: ShippingProfileService = req.scope.resolve(
      "shippingProfileService"
    );
    const priceListService: PriceListService =
      req.scope.resolve("priceListService");
    const categoryService = req.scope.resolve("categoryService");
    const searchService: SearchService = req.scope.resolve("searchService");
    const productCollectionService = req.scope.resolve(
      "productCollectionService"
    );

    const resPriceList = await fetch(
      `http://mirthout.vitalab.com.ua:55080/labs/get_price_list/`,
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

    // console.log(resCategories);

    if (resPriceList.ok) {
      const data = await resPriceList.json();

      const {
        data: { items: analyzesList },
      } = data;

      const analyzes = analyzesList;
      // console.log(analyzes);

      return await entityManager.transaction(async (manager) => {
        const defaultProfile = await shippingProfileService
          .withTransaction(manager)
          .retrieveDefault();

        const productServiceTx = productService.withTransaction(manager);
        const variantServiceTx = productVariantService.withTransaction(manager);
        const categoryServiceTx = categoryService.withTransaction(manager);
        const salesChannelServiceTx =
          salesChannelService.withTransaction(manager);
        const priceListServiceTx = priceListService.withTransaction(manager);
        // const searchServiceTx = searchService.withTransaction(manager);
        const productCollectionServiceTx =
          productCollectionService.withTransaction(manager);

        // const categories = analyzes
        //   .map((product) => product.category_name)
        //   .filter((item, pos, array) => array.indexOf(item) == pos);

        const getAnalysisСategory = (с) => {
          if (с.category) {
            return getAnalysisСategory(с.category);
          } else {
            return { name: с.name, id: с.id };
          }
        };

        // const getCategories = async (data) => {
        //   const categoriesInDb = await categoryServiceTx.list();
        //   const categories = [];
        //   let previousId = null;

        //   // console.log("ggg",data.category.id);
        //   const getСategory = (data) => {
        //     // console.log("gggg", data);
        //     if (data.category) {
        //       const exists = categoriesInDb.some(
        //         (c) => c.code === data.category.id
        //       );
        //       const found = categories.some((c) => c.code === data.category.id);
        //       // console.log(exists);
        //       if (!found && !exists) {
        //         categories.push({
        //           name: data.category.name,
        //           code: data.category.id,
        //           parentId: previousId,
        //         });
        //       }

        //       previousId = data.category?.id;
        //       return getСategory(data.category);
        //     } else {
        //       previousId = null;
        //     }
        //   };

        //   data.forEach((node) => getСategory(node.category_tree));

        //   return categories;
        // };

        // const categories = await getCategories(analyzes);
        const categories = await resCategories.json();
        // console.log(categories.data.items);

        const categoryPromises = categories.data.items.map(
          async (category: any) => {
            const exist = await categoryServiceTx.find(category.name);

            // if (exist.length > 0) {
            //   await categoryService.createCollection({
            //     title: exist[0].name,
            //     handle: exist[0].id,
            //   });
            // }

            if (exist.length === 0) {
              return await categoryServiceTx.create(category);
            } else {
              await categoryService.updateProductCount(exist[0].id, 0);
            }
          }
        );

        await Promise.all(categoryPromises);

        // await productServiceTx.list({}б).then(async (products) => {
        //   console.log("products", products);
        // });

        //@ts-ignore
        const productsList = await productService.list({}, { limit: 1000 });

        const filteredList = productsList.filter(
          (o1) => !analyzes.some((o2) => o2.id === o1.external_id)
        );

        filteredList.forEach(
          async (product) =>
            await productService.update(product.id, {
              status: ProductStatus.DRAFT,
            })
        );

        const revalidateList = new Set();

        // const responseDeleteAllDocuments =
        //   await searchService.deleteAllDocuments(ProductService.IndexName);
        // console.log("responseDeleteAllDocuments", responseDeleteAllDocuments);

        const promises = analyzes.map(async (product: any) => {
          // const code = getAnalysisСategory(product.category_tree);
          const category = await categoryServiceTx.findByCode(
            product.category_id
          );
          // console.log(product.category_id);
          // console.log(`id: ${category[0]}`);
          const id = uuidv4();

          const payload = {
            id: product.id,
            code: product.code,
            name: product.name,
            // category_name: "Вірус кору",
            // category_id: "20620d84cc1c468e9d4f5f1c5a043ec6",
            // price: 20400,
            base_price: product.base_price,
            is_active: product.is_active,
            manipulation_id: product.manipulation_id
              ? product.manipulation_id
              : "0",
            days: product.days ? product.days : "0",
            // category_tree: { category: [Object] },
          };

          try {
            const research = await productService
              .retrieveByExternalId(product.id, {
                relations: ["variants.prices"],
              })
              .then((res) => {
                return {
                  id: res.external_id,
                  code: res.mid_code,
                  name: res.title,
                  // category_name: "Вірус кору",
                  // category_id: "20620d84cc1c468e9d4f5f1c5a043ec6",
                  // price: 20400,
                  base_price: res.variants[0].prices[0].amount,
                  is_active: res.status === ProductStatus.PUBLISHED ? 1 : 0,
                  manipulation_id: res.metadata.manipulation_id,
                  days: res.metadata.days,
                  // category_tree: { category: [Object] },
                };
              });

            if (!_.isEqual(payload, research)) {
              // console.log("payload", payload);
              // console.log("research", research);

              revalidateList.add(category[0].id);
            }
          } catch (error) {
            console.log(error);
          }

          const newAnalysis = await productServiceTx
            .retrieveByExternalId(product.id)
            .then((p: any) =>
              productServiceTx.update(p.id, {
                title: product.name,
                subtitle: null,
                description: product.description
                  .replace(/\r\n/g, ";")
                  .replace(/\t/g, " "),
                // handle: id,
                is_giftcard: false,
                status: product.is_active
                  ? ProductStatus.PUBLISHED
                  : ProductStatus.DRAFT,
                thumbnail: null,
                profile_id: defaultProfile.id,
                weight: 400,
                length: null,
                height: null,
                width: null,
                hs_code: null,
                origin_country: null,
                mid_code: product.code ? product.code : null,
                material: null,
                collection_id: null,
                discountable: true,
                metadata: {
                  category_tree: product.category_tree,
                  category: {
                    name: category[0].name,
                    code: category[0].id,
                  },
                  manipulation_id: product.manipulation_id
                    ? product.manipulation_id
                    : "0",
                  days: product.days ? product.days : "0",
                },
              })
            )
            .catch((err) =>
              productServiceTx.create({
                // id: product.id,
                title: product.name,
                subtitle: null,
                description: product.description
                  .replace(/\r\n/g, ";")
                  .replace(/\t/g, " "),
                handle: id,
                is_giftcard: false,
                status: product.is_active
                  ? ProductStatus.PUBLISHED
                  : ProductStatus.DRAFT,
                thumbnail: null,
                profile_id: defaultProfile.id,
                weight: 400,
                length: null,
                height: null,
                width: null,
                hs_code: null,
                origin_country: null,
                mid_code: product.code ? product.code : null,
                material: null,
                collection_id: null,
                discountable: true,
                metadata: {
                  category_tree: product.category_tree,
                  category: {
                    name: category[0].name,
                    code: category[0].id,
                  },
                  manipulation_id: product.manipulation_id
                    ? product.manipulation_id
                    : "0",
                  days: product.days ? product.days : "0",
                },
                // category_id: "57",
                // @ts-ignore: Object literal may only specify known properties, and 'external_id' does not exist in type 'CreateProductInput'.
                external_id: product.id,
              })
            );

          const isProductInSalesChannels =
            await productServiceTx.isProductInSalesChannels(newAnalysis.id, [
              "sc_01H3C2ZWN3EBAX1WD034YYNS27",
            ]);

          !isProductInSalesChannels &&
            (await salesChannelServiceTx.addProducts(
              "sc_01H3C2ZWN3EBAX1WD034YYNS27",
              [newAnalysis.id]
            ));

          try {
            if (product.is_active) {
              await categoryService.updateProductCount(category[0].id, 1);
            }
          } catch (error) {
            console.log("collection error", error);
          }

          try {
            await productCollectionServiceTx
              .retrieveByHandle(category[0].id)
              .then(async (collection) => {
                console.log(
                  "update collection",
                  collection.id,
                  category[0].name,
                  category[0].id
                );
                await categoryService.update(category[0].id, collection.id);
                await productCollectionServiceTx.addProducts(collection.id, [
                  newAnalysis.id,
                ]);
              })
              .catch(async () => {
                console.log(
                  "create collection:",
                  category[0].name,
                  category[0].id
                );
                const collection = await categoryService.createCollection({
                  title: category[0].name,
                  handle: category[0].id,
                });

                await categoryService.update(category[0].id, collection.id);
                await productCollectionServiceTx.addProducts(collection.id, [
                  newAnalysis.id,
                ]);

                console.log("new collection:", collection);
              });
          } catch (error) {
            console.log("collection error", error);
          }

          // if (!exist) {
          //   const collection = await categoryService.createCollection({
          //     title: category[0].name,
          //     handle: category[0].id,
          //   });

          //   await categoryService.update(category[0].id, collection.id);
          //   await productCollectionServiceTx.addProducts(collection.id, [
          //     newAnalysis.id,
          //   ]);
          // } else {
          //   await categoryService.update(category[0].id, exist.id);
          //   await productCollectionServiceTx.addProducts(exist.id, [
          //     newAnalysis.id,
          //   ]);
          // }

          const v = await productServiceTx.retrieveVariants(newAnalysis.id);
          if (v.length) {
            // console.log(v);
            const variant = {
              title: "default",
              mid_code: product.code ? product.code : null,
              prices: [
                {
                  currency_code: "uah",
                  amount: product.base_price,
                },
              ],
              metadata: {
                category_tree: product.category_tree,
                category: {
                  name: category[0].name,
                  code: category[0].id,
                },
                manipulation_id: product.manipulation_id
                  ? product.manipulation_id
                  : "0",
                days: product.days ? product.days : "0",
              },
              options: [],
              inventory_quantity: 1,
              manage_inventory: false,
            };

            await variantServiceTx.update(v[0].id, variant);
          } else {
            const variant = {
              title: "default",
              mid_code: product.code ? product.code : null,
              prices: [
                {
                  currency_code: "uah",
                  amount: product.base_price,
                },
              ],
              metadata: {
                category_tree: product.category_tree,
                category: {
                  name: category[0].name,
                  code: category[0].id,
                },
                manipulation_id: product.manipulation_id
                  ? product.manipulation_id
                  : "0",
                days: product.days ? product.days : "0",
              },
              options: [],
              inventory_quantity: 1,
              manage_inventory: false,
            };

            await variantServiceTx.create(newAnalysis.id, variant);
          }

          if (category[0].id !== 14) {
            const [variants] = await priceListServiceTx.listVariants(
              "pl_01H3C3H6ER5935MS665HW20VZH",
              {
                product_id: newAnalysis.id,
              },
              { select: ["id"] },
              true
            );

            // console.log("variants", variants[0].prices[0].id);

            await priceListServiceTx.update("pl_01H3C3H6ER5935MS665HW20VZH", {
              prices: [
                {
                  id: variants[0].prices.length > 0 && variants[0].prices[0].id,
                  variant_id: variants[0].id,
                  amount: product.price,
                  currency_code: "uah",
                },
              ],
            });
          }
          // const variant = {
          //   title: "default",
          //   prices: [
          //     {
          //       currency_code: "uah",
          //       amount: 2950,
          //     },
          //   ],
          //   options: [],
          //   inventory_quantity: 1,
          // };

          // console.log(newAnalysis.id)
          // await variantServiceTx.update(newAnalysis.id, variant);

          return newAnalysis;
        });

        const products = await Promise.all(promises);

        const retrieveProduct_ = async (product_id) => {
          return await productServiceTx.retrieve(product_id, {
            select: [
              "id",
              "title",
              "subtitle",
              "status",
              "description",
              "handle",
              "mid_code",
              "is_giftcard",
              "discountable",
              "thumbnail",
              "profile_id",
              "collection_id",
              "type_id",
              "origin_country",
              "created_at",
              "updated_at",
            ],
            relations: [
              "variants",
              "tags",
              "type",
              "collection",
              "variants.prices",
              "variants.options",
              "options",
            ],
          });
        };

        try {
          // const searchListPromises = productsList.map(async (product) => {
          //   const receivedProduct = await retrieveProduct_(product.id);

          //   const search = await searchService.addDocuments(
          //     ProductService.IndexName,
          //     [receivedProduct],
          //     indexTypes.products
          //   );

          //   // console.log(search);
          // });

          const [data, count] = await productServiceTx.listAndCount(
            {},
            { take: 1000 }
          );

          const searchListPromises = data.map(async (product) => {
            if (product.status === ProductStatus.PUBLISHED) {
              const search = await searchService.addDocuments(
                ProductService.IndexName,
                [product],
                indexTypes.products
              );
              // console.log(search);
            } else {
              const deleted = await searchService.deleteDocument(
                ProductService.IndexName,
                product.id
              );
              console.log("deletedIndex", deleted);
            }
          });

          await Promise.all(searchListPromises);
        } catch (error) {
          console.log("searchListPromises error:", error);
        }

        // console.log("result", products);

        console.log("revalidateList", revalidateList);

        // await fetch(
        //   "https://vitalab.com.ua/api/revalidate3?secret=ZEwIIbZg7ICGOjd3SN0M",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify([revalidateList]),
        //   }
        // );

        return res.json({ products });
      });
    }

    // if (!response.ok) {
    //   const data = await response.json();
    //   let analyzes = data.data.items;
    //   // console.dir(category_tree.category);

    //   let array = [];
    //   console.log(analyzes.length);

    //   let array2 = [];
    //   for (let index = 0; index < analyzes.length; index++) {
    //     const element = analyzes[index];

    //     const found = array2.findIndex((object) => {
    //       return object.name === analyzes[index].category_tree.category.name;
    //     });

    //     // console.log(found);
    //     if (found >= 0) {
    //       if (
    //         Object.hasOwn(analyzes[index].category_tree.category, "category")
    //       ) {
    //         const l2 = array2[found].items.findIndex((object) => {
    //           return (
    //             object?.name ===
    //             analyzes[index].category_tree.category.category.name
    //           );
    //         });

    //         if (l2 >= 0) {
    //           if (
    //             Object.hasOwn(
    //               analyzes[index].category_tree.category.category,
    //               "category"
    //             )
    //           ) {
    //             const l3 = array2[found].items[l2].items.findIndex((object) => {
    //               return (
    //                 object?.name ===
    //                 analyzes[index].category_tree.category.category.category
    //                   .name
    //               );
    //             });

    //             if (l3 < 0) {
    //               array2[found].items[l2].items.push({
    //                 name: analyzes[index].category_tree.category.category
    //                   .category.name,
    //                 items: [],
    //               });
    //             }
    //           }
    //         } else {
    //           if (
    //             Object.hasOwn(
    //               analyzes[index].category_tree.category.category,
    //               "category"
    //             )
    //           ) {
    //             array2[found].items.push({
    //               name: element.category_tree.category.category.name,
    //               items: [
    //                 {
    //                   name: analyzes[index].category_tree.category.category
    //                     .category.name,
    //                   items: [],
    //                 },
    //               ],
    //             });
    //           } else {
    //             array2[found].items.push({
    //               name: element.category_tree.category.category.name,
    //               items: [],
    //             });
    //           }
    //         }
    //       }
    //     } else {
    //       let item = { name: element.category_tree.category.name, items: [] };

    //       if (
    //         Object.hasOwn(analyzes[index].category_tree.category, "category")
    //       ) {
    //         if (
    //           Object.hasOwn(
    //             analyzes[index].category_tree.category.category,
    //             "category"
    //           )
    //         ) {
    //           item.items.push({
    //             name: analyzes[index].category_tree.category.category,
    //             items: [
    //               {
    //                 name: analyzes[index].category_tree.category.category
    //                   .category.name,
    //                 items: [],
    //               },
    //             ],
    //           });
    //         } else {
    //           item.items.push({
    //             name: analyzes[index].category_tree.category.category.name,
    //             items: [],
    //           });
    //         }
    //       }

    //       array2.push(item);
    //     }
    //   }
    //   console.log(array2[0].items.forEach((item) => console.log(item)));
    // }

    res.json({
      message: "hello",
    });
  });
};
