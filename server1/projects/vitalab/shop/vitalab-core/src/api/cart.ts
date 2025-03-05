import cors from "cors";
import bodyParser from "body-parser";
import { projectConfig } from "../../medusa-config";
import { EntityManager } from "typeorm";

export default (router) => {
  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };

  const jsonParser = bodyParser.json();

  router.options("/store/cart/metadata", cors(storeCorsOptions));
  router.get(
    "/store/cart/metadata/:cartId/:metadata",
    cors(storeCorsOptions),
    async (req, res) => {
      const { cartId, metadata } = await req.params;
      const objectMetadata = JSON.parse(metadata);

      const cartService = req.scope.resolve("cartService");

      const cart = await cartService.setMetadata(
        cartId,
        Object.keys(objectMetadata)[0],
        Object.values(objectMetadata)[0]
      );

      console.log(cart);
      res.json({
        message: "Welcome to Medusa!",
      });
    }
  );

  router.options("/store/cart", cors(storeCorsOptions));
  router.put(
    "/store/cart",
    jsonParser,
    cors(storeCorsOptions),
    async (req, res) => {
      // console.log("1111111111111111111111", req.body);
      const { id, data } = await req.body;

      const cartService = req.scope.resolve("cartService");
      const manager: EntityManager = req.scope.resolve("manager");
      await manager.transaction(async (transactionManager) => {
        for (const [key, value] of Object.entries(data)) {
          await cartService
            .withTransaction(transactionManager)
            .setMetadata(id, key, value);
        }
      });

      const cart = await cartService.retrieve(id);
      // const cart = await cartService.setMetadata(
      //   id,
      //   Object.keys(objectMetadata)[0],
      //   Object.values(objectMetadata)[0]
      // );

      // const customerService = req.scope.resolve("customerService");
      // const cart = await customerService.update(id, data);

      // //   //   console.log(cart);      
      res.status(200).json({ cart });
    }
  );
};
