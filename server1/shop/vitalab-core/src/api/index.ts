import { Router } from "express";
import analyzesRoutes from "./analyzes";
import categoriesRoutes from "./categories";
import cartRoutes from "./cart";
import productsRoutes from "./products";
import customerRoutes from "./customer";
import liqpay from "./liqpay";
import addusers from "./create-user";
import test from "./test";
import collections from "./collections";
import check from "./check";

export default (): Router => {
  const router: Router = Router();

  customerRoutes(router);
  analyzesRoutes(router);
  categoriesRoutes(router);
  cartRoutes(router);
  productsRoutes(router);
  liqpay(router);
  addusers(router);
  test(router);
  collections(router);
  check(router);

  return router;
};
