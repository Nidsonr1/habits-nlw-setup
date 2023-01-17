import Fastify from "fastify";
import cors from '@fastify/cors'; 

import { PrismaClient } from '@prisma/client';

const server = Fastify();
const prisma = new PrismaClient();

server.register(cors);

server.get('/', async () => {
  const habits = await prisma.habit.findMany();
  return habits
});

server.listen({
  port: 3333
}).then(() => {
  console.log('HTTP Server Running!')
});