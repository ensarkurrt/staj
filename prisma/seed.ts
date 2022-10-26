import { BankAccountType, CurrencyType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userData = [
  /*{
    name: "Edanova",
    email: "admin@edanova.com",
    username: "edanova",
    password: "123123123",
  },*/
];

async function main() {
  console.log(`Start seeding ...`);
  /* for (const u of userData) {

    u.password = await hash(u.password);

    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  } */

  try {
    await prisma.money.create({
      data: {
        amount: 18.6,
        currencyType: CurrencyType.USD,
      },
    });

    await prisma.money.create({
      data: {
        amount: 18.75,
        currencyType: CurrencyType.EUR,
      },
    });

    await prisma.money.create({
      data: {
        amount: 1,
        currencyType: CurrencyType.TRY,
      },
    });

    const user = await prisma.user.create({
      data: {
        phone: "00000000000",
        tckn: "11111111111",
        name: "Bank Admin",
        email: "admin@bank.com",
        password: "$2a$10$TickyMOWjhRRqTsvvOkTy.ZygEQQFW9vh93rwfol./aN242o3XIVm", // 123456
      },
    });

    await prisma.bankAccount.create({
      data: {
        iban: "TR000000000000000000000000",
        balance: 0,
        currency: CurrencyType.TRY,
        type: BankAccountType.CURRENT,
        userId: user!.id,
      },
    });
  } catch (e) {
    console.log(e);
  }

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
