/*
  Warnings:

  - Added the required column `colour` to the `boxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boxes" ADD COLUMN     "colour" TEXT NOT NULL;
