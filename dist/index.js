"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const toml = __importStar(require("@iarna/toml"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function run() {
    try {
        const fileName = core.getInput("file", { required: true });
        const key = core.getInput("key", { required: true });
        const value = core.getInput("value", { required: true });
        const filePath = path.join(process.env.GITHUB_WORKSPACE, fileName);
        if (!fs.existsSync(filePath)) {
            throw new Error(`The toml file does not exist: ${fileName}`);
        }
        let f = fs.readFileSync(filePath, "utf8");
        let data = toml.parse(f);
        fs.writeFileSync(filePath, toml.stringify(setTomlByKey(data, key, value)));
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
function setTomlByKey(t, key, value) {
    let k = key.split(".");
    if (k.length == 1) {
        t[k[0]] = value;
    }
    else if (k.length == 2) {
        t[k[0]][k[1]] = value;
    }
    else if (k.length == 3) {
        t[k[0]][k[1]][k[2]] = value;
    }
    return t;
}
run();
