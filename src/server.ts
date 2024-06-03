import { fastify } from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const app = fastify();
const prisma = new PrismaClient();

app.get('/sensor/fluxo', async () => {
    const flows = await prisma.flow.findMany();

    return { flows };
});

app.post('/sensor/fluxo', async (request, replay) => {
    const createFlowSchema = z.object({
        sensor: z.string(),
        valor: z.string(),
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

app.get('/sensor/clima', async (request, replay) => {
    const climates = await prisma.climate.findMany();

    return { climates }
});

app.post('sensor/clima', async (request, replay) => {
    const createClimateSchema = z.object({
        sensor: z.string(),
        temperatura: z.string(),
        umidade: z.string()
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
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log("Servidor HTTP Rodando");
});