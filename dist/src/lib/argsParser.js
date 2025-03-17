"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = argsParser;
/**
 * Parses args like '--force' and '--name=hello' and
 * returns object like `{ force: true, name: 'hello' }`
 */
function argsParser(args) {
    return args.reduce((acc, arg) => {
        if (arg.startsWith("--")) {
            if (arg.includes("=")) {
                const [key, value] = arg.slice(2).split("=");
                return { ...acc, [key]: value };
            }
            return { ...acc, [arg.slice(2)]: true };
        }
        const [key, value] = arg.split("=");
        return { ...acc, [key]: value };
    }, {});
}
