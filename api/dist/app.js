"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const PostRepository_1 = __importDefault(require("./repositories/posts/PostRepository"));
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
app.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield new PostRepository_1.default().getAll();
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
