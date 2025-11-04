/*
  Warnings:

  - Made the column `fecha_registro` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "fecha_registro" SET NOT NULL,
ALTER COLUMN "fecha_registro" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "fecha_registro" SET DATA TYPE TIMESTAMP(3);
