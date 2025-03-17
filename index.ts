#! /usr/bin/env node

import { todo } from "node:test";
import create from "./src/create";
import { init } from "./src/init";
import argsParser from "./src/lib/argsParser";
import c from "ansi-colors";
import displayHelp from "./src/lib/displayHelp";
import update from "./src/update";
import revert from "./src/revert";
import confirm from "./src/lib/confirm";
import log from "./src/log";

//TODO: refacto to avoid reverse
const args = process.argv.slice(2).reverse();

//parsing args
// first arg should de command
const func = args.pop();
switch (func) {
  case "init":
    init();
    break;
  case "create":
    const argsObj = argsParser(args);
    const name = args.pop();
    if (!name) throw new Error("Missing name argument");
    const force = "force" in argsObj ? argsObj.force === true : false;
    create(name, force);
    break;
  case "createdb":
    todo();
    break;
  case "update":
    update();
    break;
  case "dump":
    todo();
    break;
  case "revert":
    const number = parseInt(args.pop() ?? "");
    if (isNaN(number)) {
      confirm("This will revert the last migration. Data will be lost.").then(
        () => {
          revert(1);
        },
      );
    } else {
      confirm(
        "This will revert the last " +
          number +
          " migration(s). Data will be lost.",
      ).then(() => {
        revert(number);
      });
    }
    break;
  case "log":
    const all = args.includes("-a");

    if (all) {
      log(0);
    } else {
      log();
    }
    break;
  default:
    if (typeof func === "string") {
      console.log(c.red(`Command '${func}' does not exist`));
    }
    displayHelp();
}
