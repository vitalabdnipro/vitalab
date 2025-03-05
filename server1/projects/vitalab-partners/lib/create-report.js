import { promises as fs } from "fs";
import { dirname as path } from "path";

// import murmurhash from "murmurhash";

const createReport = async (base64, analysisId, orderId, directoryHash) => {
  let buff = Buffer.from(base64, "base64");
  const filePath = `./r/${directoryHash}/${analysisId}.pdf`;

  console.log(path(filePath));

  // fs.mkdir(path(filePath), { recursive: true }, function (err) {
  //   if (err) {
  //     if (err.code == "EEXIST") {
  //       console.log(err); // Ignore the error if the folder already exists}
  //     } else {
  //       console.log(err); // Something else went wrong
  //     }
  //   } else {
  //     // fs.writeFile(path, contents, cb);
  //     fs.writeFile(`./r/${directoryHash}/${analysisId}.pdf`, buff);
  //     console.log(`Medical report created: ${filePath}`);
  //   }
  // });
  
  // fs.mkdir(path(filePath), { recursive: true }).then((err) => {
  //   if (err) {
  //     if (err.code == "EEXIST") {
  //       console.log(err); // Ignore the error if the folder already exists}
  //     } else {
  //       console.log(err); // Something else went wrong
  //       return;
  //     }
  //   }
  //   // fs.writeFile(path, contents, cb);
  // });
  fs.writeFile(`./r/${directoryHash}/${analysisId}.pdf`, buff);
  console.log(`Medical report created: ${filePath}`);

  // const directoryHash = murmurhash.v3(orderId, 8);

  // const isExist = async (path) =>
  //   await fs
  //     .access(path)
  //     .then(() => true)
  //     .catch(() => false);

  // if (!(await isExist(`./r/${directoryHash}`))) {
  //   await fs.mkdir(`./r/${directoryHash}`);
  // }

  // await fs.writeFile(`./r/${directoryHash}/${analysisId}.pdf`, buff);
  // console.log(`Medical report created: ${directoryHash}/${analysisId}`);

  // if (!fs.access(`./r/${directoryHash}`)) {
  //   await fs.mkdir(`./r/${directoryHash}`);
  // }

  // fs.writeFileSync(`./r/${directoryHash}/${analysisId}.pdf`, buff);
  // console.log(`Medical report created: ${analysisId}`);

  // fs.mkdir(`./r/${directoryHash}`, (err) => {
  //   if (err) {
  //     console.log(`Failed to create directory ${orderId} - ${err}`);
  //   } else {
  //     fs.writeFileSync(`./r/${directoryHash}/${analysisId}.pdf`, buff);
  //     console.log(`Medical report created: ${analysisId}`);
  //   }
  // });
  // fs.writeFileSync(`./r/${murmurhash.v3(orderId, 8)}/${analysisId}.pdf`, buff);
};

export default createReport;
