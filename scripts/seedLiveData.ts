import prisma from "../libs/prismadb";

async function main() {
  await prisma.live.createMany({
    data: [
      {
        title: "Breaking News: Cryptocurrency Market Surges",
        liveType: "News",
        organisation: "Crypto News Network",
        headline: "Bitcoin reaches new all-time high",
        content: "The cryptocurrency market experienced a significant surge today...",
        author: "John Doe",
        date: new Date(),
      },
      // ... diğer örnek veriler
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });