/*
  Warnings:

  - You are about to drop the `Sensor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sensor";

-- CreateTable
CREATE TABLE "Flow" (
    "id" TEXT NOT NULL,
    "sensor" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "climate" (
    "id" TEXT NOT NULL,
    "sensor" TEXT NOT NULL,
    "temperatura" TEXT NOT NULL,
    "umidade" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "climate_pkey" PRIMARY KEY ("id")
);
