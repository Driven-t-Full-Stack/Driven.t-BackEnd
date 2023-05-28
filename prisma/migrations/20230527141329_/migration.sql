/*
  Warnings:

  - Made the column `location` on table `Activities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Activities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Activities" ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL;
