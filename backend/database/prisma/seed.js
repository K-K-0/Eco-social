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
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.organizations.createMany({
            data: [
                {
                    id: 1,
                    name: 'Green Roots Delhi',
                    description: 'Tree plantation and cleanup drives',
                    latitude: 28.561, // Example: Delhi
                    longitude: 77.234,
                },
                {
                    id: 2,
                    name: 'Eco Champs Noida',
                    description: 'Workshops and recycling events',
                    latitude: 28.574,
                    longitude: 77.356,
                },
                {
                    id: 3,
                    name: 'Nature Ninjas Gurgaon',
                    description: 'Local clean-up squads and eco awareness',
                    latitude: 28.459,
                    longitude: 77.026,
                },
            ],
        });
    });
}
main()
    .then(() => console.log('🌱 Seeded organizations'))
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
