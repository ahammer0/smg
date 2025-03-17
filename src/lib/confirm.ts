import readline from "node:readline";

/**
 *  @async
 *  Prompts the user with optional message and resolve if user provided 'y'
 *  else exits program
 */
export default async function confirm(message?: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const prom = new Promise((resolve, _reject) => {
    message && console.log(message);
    rl.question("Are you sure? (y/N)", (ans) => {
      rl.close();
      if (ans.toLowerCase() === "y") {
        resolve(true);
      } else {
        console.log("Aborting...");
        process.exit();
      }
    });
  });
  await prom;
}
