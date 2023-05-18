import { prisma } from '@/config';
import { redis } from '@/config/redis';

const cacheKey = 'event';

async function findFirst() {
  const cachedEvent = await redis.get(cacheKey);

  if (cachedEvent) {
    const event = JSON.parse(cachedEvent);
    return event;
  }
  const event = await prisma.event.findFirst();

  delete event.createdAt;
  delete event.updatedAt;

  redis.set(cacheKey, JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
