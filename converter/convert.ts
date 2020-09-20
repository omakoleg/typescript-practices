import fs from "fs";
import path from "path";
import { Glob } from "glob";
import { ensureDir } from "fs-extra";

const source = `${process.cwd()}/src`;
const destination = `${process.cwd()}/markdown`;

console.log("source", source);

const getFiles = async (cwd: string): Promise<string[]> =>
  new Promise((res, rej) => {
    new Glob(`**/*.ts`, { cwd }, (er, data) => {
      if (er) {
        return rej(er.toString());
      }
      return res(data);
    });
  });

async function main() {
  console.log("destination", destination);
  await ensureDir(destination);

  const files = await getFiles(source);

  console.log(JSON.stringify(files, undefined, 4));
  for (const fileName of files) {
    console.log("fileName", fileName);
  }
}
main();
