import cors from "cors";
import bodyParser from "body-parser";
import { projectConfig } from "../../medusa-config";

export default (router) => {
  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  };

  const jsonParser = bodyParser.json();

  router.options("/customer/", cors(storeCorsOptions));
  router.post(
    "/customer/",
    jsonParser,
    cors(storeCorsOptions),
    async (req, res) => {
      console.log("1111111111111111111111", req.body);
      const { id, data } = await req.body;

      const customerService = req.scope.resolve("customerService");
      const cart = await customerService.update(id, data);

      //   //   console.log(cart);
      console.log("111",data);
      res.json({
        message: "Welcome to Medusa!111",
      });
    }
  );
};
