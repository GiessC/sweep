"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV == 'local') {
    dotenv_1.default.config({ path: '.env.local' });
}
else if (process.env.NODE_ENV == 'production') {
    dotenv_1.default.config({ path: '.env' });
}
else {
    dotenv_1.default.config({ path: '.env.development' });
}
const app = (0, express_1.default)();
const port = isNaN(Number(process.env.PORT))
    ? 5000
    : Number(process.env.PORT);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
