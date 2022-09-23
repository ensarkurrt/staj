
import {
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

const userData= [
  /*{
    name: "Edanova",
    email: "admin@edanova.com",
    username: "edanova",
    password: "123123123",
  },*/
];

async function main() {
  console.log(`Start seeding ...`);
/*  for (const u of userData) {

    u.password = await hash(u.password);

    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }*/
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
