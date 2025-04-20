/*
  Warnings:

  - Made the column `slug` on table `link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "link" ALTER COLUMN "slug" SET NOT NULL;
