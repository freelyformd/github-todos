"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function main(app) {
    app.log("Cheers, the app runs on a server!");
    app.on("push", (context) => __awaiter(this, void 0, void 0, function* () {
        const postIssue = context.issue({ body: "Thanks for opening a repository in this account." });
        return context.github.issues.createComment(postIssue);
    }));
}
exports.default = main;
//# sourceMappingURL=main.js.map