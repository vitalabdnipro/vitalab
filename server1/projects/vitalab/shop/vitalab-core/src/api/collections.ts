import cors from "cors";
import { projectConfig } from "../../medusa-config";

export default (router) => {
  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };

  router.options("/store/collections/:handle", cors(storeCorsOptions));
  router.get(
    "/store/collections/:handle",
    cors(storeCorsOptions),
    async (req, res) => {
      const { handle } = req.params;
      const collectionService = req.scope.resolve("productCollectionService");

      const response = await collectionService.retrieveByHandle(handle, {
        relations: [
          "products",
          "products.variants",
          "products.images",
          "products.variants.prices",
          "products.variants.options",
          "products.options",
        ],
      });

      res.json(response);
    }
  );
};
