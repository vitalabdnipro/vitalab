import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { data } = req.body;
    
    let hash = null;    
    if (data.password !== null) {
      hash = await bcrypt.hash(data.password, 12);
    }

    console.log(data.password);
    const partners = await prisma.user.update({
      where: {
        id: req.query.id,
      },
      data: {
        organization: { update: { name: data.organization } },
        lisId: data.lisId,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        phone: data.phone,
        email: data.email,
        isActive: data.isActive ? "TRUE" : "FALSE",
        password: data.password !== null ? hash : undefined,
      },
    });
    res.status(200).json(partners);
  }
}
