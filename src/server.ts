import "dotenv/config"; // ຕ້ອງຢູ່ບັນທັດທຳອິດ
import app from "./app";
import { prisma } from "./config/prisma";

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});