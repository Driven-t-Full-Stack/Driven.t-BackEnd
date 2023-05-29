import { prisma } from "@/config";

async function findTimeById(timeId: number) {
    return prisma.time.findFirst({
        where: {
            id: timeId,
        }
    });
}

const timeRepository = {
    findTimeById,
}

export default timeRepository;
