import { DayType, LocationType, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let time = await prisma.time.findFirst();
  if (!time) {
  const times = [
    { startTime: 9, endTime: 10 },
    { startTime: 9, endTime: 11 },
    { startTime: 9, endTime: 12 },
    { startTime: 10, endTime: 11 },
    { startTime: 10, endTime: 12 },
    { startTime: 11, endTime: 12 },
  ];

  for (const time of times) {
    await prisma.time.create({ 
      data: {
        start: time.startTime,
        end: time.endTime,
      },
    });
  }
  }

  let activities = await prisma.activities.findFirst();
  if (!activities) {
  const friday: DayType = 'Sexta';
  const locations: LocationType[] = [
    'Auditorio_Lateral',
    'Auditorio_Principal',
    'Sala_de_Workshops',
  ];

  const activitiesList = [
    {
      eventId: 1,
      title: 'Oppenheimer',
      location: locations[1],
      date: friday,
      timeId: 1,
      availableSlots: 34
      
    },
    {
      eventId: 1,
      title: 'Barbie',
      location: locations[1],
      date: friday,
      timeId: 5,
      availableSlots: 7
      
    },
    {
      eventId: 1,
      title: 'The Flash',
      location: locations[0],
      date: friday,
      timeId: 3,
      availableSlots: 16
      
    },
    {
      eventId: 1,
      title: "Aprendendo Stop Motion com 'Fuga das Galinhas'",
      location: locations[3],
      date: friday,
      timeId: 1,
      availableSlots: 10
      
    },
    {
      eventId: 1,
      title: "Saiba como criar boas análises de filmes",
      location: locations[3],
      date: friday,
      timeId: 4,
      availableSlots: 15
      
    },
    {
      eventId: 1,
      title: "Workshop para Dublês: Imitando 'Missão Impossível'",
      location: locations[3],
      date: friday,
      timeId: 6,
      availableSlots: 13
      
    },
  ];
    for (const activity of activitiesList) {
      await prisma.activities.create({
        data: {
          eventId: activity.eventId,
          title: activity.title,
          location: activity.location,
          date: activity.date,
          timeId: activity.timeId,
          availableSlots: activity.availableSlots 
        },
      });
  }
}

  console.log( event, time, activities );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
