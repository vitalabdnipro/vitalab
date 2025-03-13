// import { promises as fs } from "fs";
import fs from "fs";
import { resolve } from "path";
import murmurhash from "murmurhash";
// import omniCell from "../../lib/omnicell";

export default async function handler(req, res) {
  const directoryHash = murmurhash.v3("555000000502", 8);
  console.log(directoryHash);

  const createDir = await fs.promises.mkdir(`/usr/share/caddy/r/${directoryHash}`, {
    recursive: true,
  });

  const filePath = `/usr/share/caddy/r/${directoryHash}.txt`;
  const fileContent = 'Hello, world!';

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      return;
    }
    console.log('File created successfully.');
  });
  // console.log(resolve(`./r1/`, String(directoryHash)));

  // const data = new Uint8Array(Buffer.from("Hello Node.js"));
  // const createFile = await fs.promises.writeFile(
  //   `./r/${directoryHash}/test.pdf`,
  //   data
  // );

  // if (createFile === undefined) {
  //   console.log(`Medical report created: ${createFile}`);
  // }

  // await fetch("/api/results/sms");

  // await writeFile(test);

  // fs.writeFileSync(`x.pdf`, buff);

  res.status(200).json();
}
