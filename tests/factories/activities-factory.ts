import { Activities } from '@prisma/client';

export function getActivitiesReturn() {
  const expected: Activities[] = [
    {
      id: 1,
      eventId: 1,
      title: 'Curso de encardenação',
      location: 'Auditorio_Principal',
      date: 'Sexta, 16/06',
      timeId: 1,
      availableSlots: 12,
    },
  ];

  return expected;
}
