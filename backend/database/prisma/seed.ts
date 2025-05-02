import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
    await prisma.organizations.createMany({
        data: [
            {
                id: 1,
                name: 'Green Roots Delhi',
                description: 'Tree plantation and cleanup drives',
                latitude: 28.561,  // Example: Delhi
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
}

main()
    .then(() => console.log('🌱 Seeded organizations'))
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
