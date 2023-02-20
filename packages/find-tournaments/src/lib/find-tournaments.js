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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTournaments = void 0;
const fetchTournaments_1 = require("./fetchTournaments");
const types_1 = require("./types");
function findTournaments() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = (yield (0, fetchTournaments_1.fetchTournaments)())[3];
        types_1.schema.parse(data);
        return data;
    });
}
exports.findTournaments = findTournaments;
//# sourceMappingURL=find-tournaments.js.map