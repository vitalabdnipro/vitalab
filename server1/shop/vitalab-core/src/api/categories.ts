import cors from "cors";
import { projectConfig } from "../../medusa-config";

export default (router) => {
  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };

  router.options("/store/categories", cors(storeCorsOptions));
  router.get("/store/categories", cors(storeCorsOptions), async (req, res) => {
    const categoryService = req.scope.resolve("categoryService");

    const response = await categoryService.list();
    const categories = response.map((c) => ({
      id: c.id,
      name: c.name,
      code: c.code,
      slug: c.slug,
      order: c.order,
      parentId: c.parent_id,
      productCount: c.product_count,
    }));

    res.json(categories);
  });
};
