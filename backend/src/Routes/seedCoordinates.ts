import { PrismaClient } from '../../database/generated/prisma';
const prisma = new PrismaClient();

const userId = 1; // Make sure this user exists

const indiaBounds = {
    north: 27.1,
    south: 26.7,
    west: 80.8,
    east: 81.1,
};

async function main() {
    const trees = Array.from({ length: 50 }).map(() => ({
        latitude: indiaBounds.north + Math.random() * 0.1,
        longitude: indiaBounds.west + Math.random() * 0.1,
        userId,
    }));

    await prisma.tree.createMany({
        data: trees,
        skipDuplicates: true,
    });

    console.log("🌳 Inserted 50 trees!");
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
