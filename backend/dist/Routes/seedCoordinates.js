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
const prisma_1 = require("../../database/generated/prisma");
const prisma = new prisma_1.PrismaClient();
const userId = 1; // Make sure this user exists
const indiaBounds = {
    north: 27.1,
    south: 26.7,
    west: 80.8,
    east: 81.1,
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const trees = Array.from({ length: 50 }).map(() => ({
            latitude: indiaBounds.north + Math.random() * 0.1,
            longitude: indiaBounds.west + Math.random() * 0.1,
            userId,
        }));
        yield prisma.tree.createMany({
            data: trees,
            skipDuplicates: true,
        });
        console.log("🌳 Inserted 50 trees!");
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
