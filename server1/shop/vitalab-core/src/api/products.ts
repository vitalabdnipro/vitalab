import cors from "cors";
import { projectConfig } from "../../medusa-config";

export const defaultRelations = [
  "variants",
  "variants.prices",
  "variants.options",
  "images",
  "options",
  "tags",
  "type",
  "collection",
];

export const defaultFields = [
  "id",
  "title",
  "subtitle",
  "description",
  "handle",
  "is_giftcard",
  "thumbnail",
  "profile_id",
  "collection_id",
  "type_id",
  "weight",
  "length",
  "height",
  "width",
  "hs_code",
  "origin_country",
  "mid_code",
  "material",
  "created_at",
  "updated_at",
  "metadata",
];

export default (router) => {
  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };

  router.options(
    "/store/products/retrieveByExternalId/:external_id",
    cors(storeCorsOptions)
  );
  router.get(
    "/store/products/retrieveByExternalId/:external_id",
    cors(storeCorsOptions),
    async (req, res) => {
      const { external_id } = req.params;

      const productService = req.scope.resolve("productService");

      const product = await productService.retrieveByExternalId(external_id, {
        select: defaultFields,
        relations: defaultRelations,
      });

      res.json({ product });
    }
  );
};
