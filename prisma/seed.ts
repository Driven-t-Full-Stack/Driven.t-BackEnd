import { LocationType, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import faker from '@faker-js/faker';
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
  
  let lastSpecificDays: string[] = [];

  if (event) {
    const startsAt = dayjs(event.startsAt);
    const endsAt = dayjs(event.endsAt);
  
    let currentDate = endsAt;
    let consecutiveDaysCount = 0;
  
    while (consecutiveDaysCount < 3 && currentDate.isAfter(startsAt)) {
      const dayOfWeek = currentDate.day();
  
      if ([5, 6, 0].includes(dayOfWeek)) {
        lastSpecificDays.unshift(currentDate.format("dddd, DD/MM"));
        consecutiveDaysCount++;
      } else {
        consecutiveDaysCount = 0;
        lastSpecificDays.length = 0;
      }
  
      currentDate = currentDate.subtract(1, 'day');
    }
  } else {
    console.log('Evento não encontrado');
  }

  if (lastSpecificDays.length > 0) {
    let newSpecificDaysArray: string[] = [];
    
    for( let i = 0 ; i < lastSpecificDays.length ; i++ ) {
      let word = lastSpecificDays[i].split(", ");
      
      for ( let i = 0 ; i < word.length ; i++ ) {
        newSpecificDaysArray.push(word[i])
      }
    }

    for ( let i = 0 ; i < newSpecificDaysArray.length ; i++ ) {
      switch (newSpecificDaysArray[i]) {
        case "Friday":
          newSpecificDaysArray[i] = "Sexta";
          break
        case "Saturday":
          newSpecificDaysArray[i] = "Sábado";
          break
        case "Sunday":
          newSpecificDaysArray[i] = "Domingo";
          break
        default:
          newSpecificDaysArray[i];
          break
      }
    }

    let newDatesArray: string[] = []
    for ( let i = 0 ; i < newSpecificDaysArray.length ; i += 2 ) {
      newDatesArray.push(newSpecificDaysArray[i] + ', ' + newSpecificDaysArray[i+1])
    }
    
    lastSpecificDays = newDatesArray;
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

  const locations: LocationType[] = [
    'Auditorio_Principal',
    'Auditorio_Principal',
    'Auditorio_Lateral',
    'Sala_de_Workshops',
    'Sala_de_Workshops',
    'Sala_de_Workshops',
  ];

  const activitiesList: {
    eventId: number;
    title: string;
    location: LocationType;
    date: string;
    timeId: number;
    availableSlots: number;
}[] = [];

  const timeIds = [1, 5, 3, 1, 4, 6];

  for (let i = 0; i < 18; i++) {
    const eventId = event.id;
    const title = faker.lorem.words(5);
    const location = locations[i % 6];
    const date = lastSpecificDays[Math.floor(i / 6)];
    const timeId = timeIds[i % 6];
    const availableSlots = faker.random.number({ min: 0, max: 20 });
  
    const activity = {
      eventId,
      title,
      location,
      date,
      timeId,
      availableSlots,
    };
  
    activitiesList.push(activity);
  }

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

console.log(event, time, activities)

}
  
  

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
