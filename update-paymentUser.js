const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.paymentUser.updateMany({
    where: {},
    data: {
      paymentStatus: 'pending',
      paymentDescription: 'Retiro Resgatando Anas 2024',
      active: true
    },
  });

  console.log('Todos os registros foram atualizados com valores padrão.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
