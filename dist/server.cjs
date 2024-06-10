"use strict";

// src/server.ts
var import_fastify = require("fastify");
var import_zod = require("zod");
var import_client = require("@prisma/client");
var app = (0, import_fastify.fastify)();
var prisma = new import_client.PrismaClient();
app.get("/sensor/fluxo", async () => {
  const flows = await prisma.flow.findMany();
  return { flows };
});
app.post("/sensor/fluxo", async (request, replay) => {
  const createFlowSchema = import_zod.z.object({
    sensor: import_zod.z.string(),
    valor: import_zod.z.string()
  });
  const { sensor, valor } = createFlowSchema.parse(request.body);
  const flow = await prisma.flow.create({
    data: {
      sensor,
      valor
    }
  });
  return replay.status(200).send(flow);
});
app.get("/sensor/clima", async (request, replay) => {
  const climates = await prisma.climate.findMany();
  return { climates };
});
app.post("/sensor/clima", async (request, replay) => {
  const createClimateSchema = import_zod.z.object({
    sensor: import_zod.z.string(),
    temperatura: import_zod.z.string(),
    umidade: import_zod.z.string()
  });
  const { sensor, temperatura, umidade } = createClimateSchema.parse(request.body);
  const climate = prisma.climate.create({
    data: {
      sensor,
      temperatura,
      umidade
    }
  });
  return replay.status(200).send(climate);
});
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 80
}).then(() => {
  console.log("Servidor HTTP Rodando");
});
