import prisma from "../../../../lib/prisma";
import dayjs from "dayjs";

const orderAssembly = async (id) => {
  const n = String(id);
  const order = await prisma.order.findUnique({
    where: {
      number: n,
    },
    include: {
      patient: true,
      partner: {
        include: {
          organization: true,
        },
      },
      analyzes: true,
    },
  });

  const { patient, partner, analyzes } = order;

  const tests = await analyzes.map((item) => ({
    ext_id: item.analysisId,
    id: item.analysisId,
    code: item.analysisCode,
    name: null,
    payload: item.id,
    descr: null,
    is_cito: 0,
  }));

  const getGender = (gender) => {
    switch (gender) {
      case "Чоловік":
        return "MALE";
      case "Жінка":
        return "FEMALE";
      default:
        return "OTHER";
    }
  };

  return {
    referral_data: {
      document_data: {
        ext_id: null,
        doc_num: order.number,
        descr: order.note,
        preg_week: null,
        menstrphase: null,
        diagnosis_code: null,
        policy_num: null,
        is_nczy: null,
      },
      patient_data: {
        ext_id: patient.id,
        full_name: `${patient.lastName} ${patient.firstName} ${patient.middleName}`,
        sex: getGender(patient.gender),
        birth_date: dayjs(patient.birthday).format("YYYY-MM-DD"),
        phone: patient.phone,
        email: patient.email,
        passport: null,
      },
      doctor_data: {
        ext_id: null,
        full_name: null,
        phone: null,
        email: null,
      },
      org_data: {
        ext_id: partner.lisId,
        name: partner.organization.name ? partner.organization.name : null,
        email: partner.organization.email,
      },
      reception_subdivision: {
        ext_id: partner.organization.subdivisionId,
        name: partner.organization.subdivisionName,
      },
      tests: tests,
    },
  };
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { number } = req.body;

    console.log("api number:", number);

    const order = await orderAssembly(number);

    try {
      const data = await fetch("http://mirth.vitalab.com.ua/referral/create_referral", {
        method: "POST",
        headers: {
          //   "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }).then((res) => res.json());

      console.log(order);
      console.dir(order.referral_data.tests);
      const test = await data;

      if (test.status === "OK") {
        const updateStatus = await prisma.order.update({
          where: {
            number: test.data.doc_num,
          },
          data: {
            status: "SENT",
            sentAt: new Date(),
            patient: {
              update: {
                lastOrder: test.data.doc_num,
                lastOrderCreated: new Date(),
              },
            },
            analyzes: {
              updateMany: {
                where: {},
                data: {
                  status: "SENT",
                },
              },
            },
          },
        });
      }
      console.log("done:", test);

      res.status(200).json(data);
    } catch (e) {
      res.status(500).json(console.log(e.message));
    }
  }
}
