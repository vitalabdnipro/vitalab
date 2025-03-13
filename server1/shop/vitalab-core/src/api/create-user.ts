import { CustomerService, UserService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import users from "../users.json";

function generatePassword(length) {
  // Define a string of characters to build the password from
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let password = "";

  // Generate the random password
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

export default (router) => {
  router.get("/cu", async (req, res) => {
    const customerService: CustomerService =
      req.scope.resolve("customerService");
    const entityManager: EntityManager = req.scope.resolve("manager");

    const customers = await entityManager.transaction(async (tx) => {
      for (const u of users) {
        const parts = u.birthday.split("-");
        // const parts = inputDate.split("-");
        const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
        console.log("formattedDate", formattedDate);
        
        const formattedPhone = u.telephone.replace(/^(\+38)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3-$4-$5');
        console.log("formattedDate", formattedPhone);

        // const customer = await customerService.retrieveByPhone("123456789")
        // console.log("customer", customer);
        const customerData = {
          email: u.email,
          first_name: u.firstname,
          last_name: u.lastname,
          password: generatePassword(10),
          phone: formattedPhone,
          metadata: {
            gender: u.sex === 0 ? "female" : "male",
            birthday: formattedDate,
            middle_name: u.secondname ? u.secondname : "",
          },
        };

        try {
          const customer = await customerService
            .withTransaction(tx)
            .create(customerData);

          console.log("customer", customer);

          // return customer;
        } catch (error) {
          console.log("error", error);
        }
      }
    });

    console.log("customers", customers);

    res.json({
      message: "done",
    });
  });
};

// res.status(201).json({ customer })
