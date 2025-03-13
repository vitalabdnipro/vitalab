// import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next"
import _ from "lodash";
import Nextauth from "../../api/auth/[...nextauth]";
import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  // const session = await getSession({ req });
  const session = await getServerSession(req, res, Nextauth)
  // console.log("session", session)

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  const { s: filter } = req.query;
  
  try {
    const data = await fetch("http://mirthOUT.vitalab.com.ua:55080/labs/get_price_list/", {
      method: "POST",
      // headers: {
      // //   "Access-Control-Allow-Origin": "*",
      // //   "Content-Type": "application/json",
      // },

      body: JSON.stringify({
        query: {
          org_id: user.lisId,
          filter: _.isEmpty(filter) ? null : filter,
        },
      }),
    }).then((res) => res.json());

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(console.log(e.message));
  }
}
