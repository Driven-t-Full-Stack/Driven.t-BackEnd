import timeRepository from "@/repositories/times-repository";

async function getTimeById(timeId: number) {
    const times = await timeRepository.findTimeById(timeId);
    
    return times;
}

const timeService = {
    getTimeById,
}

export default timeService;
