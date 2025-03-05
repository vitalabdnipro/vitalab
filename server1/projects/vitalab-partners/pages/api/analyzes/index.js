import { getSession } from "next-auth/react";
import _ from "lodash";

export default async function handle(req, res) {
  const session = await getSession({ req });
  const { s: filter } = req.query;
  
  try {
    const data = await fetch("http://mirth.vitalab.com.ua/labs/get_price_list/", {
      method: "POST",
      // headers: {
      // //   "Access-Control-Allow-Origin": "*",
      // //   "Content-Type": "application/json",
      // },

      body: JSON.stringify({
        query: {
          org_id: session.user.lisId,
          filter: _.isEmpty(filter) ? null : filter,
        },
      }),
    }).then((res) => res.json());

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(console.log(e.message));
  }
}
