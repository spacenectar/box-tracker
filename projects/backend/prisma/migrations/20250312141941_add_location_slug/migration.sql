/*
  Warnings:

  - A unique constraint covering the columns `[slug,spaceId]` on the table `locations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,spaceId]` on the table `locations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId,name]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,createdBy]` on the table `spaces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,createdBy]` on the table `spaces` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "rooms_slug_key";

-- DropIndex
DROP INDEX "spaces_name_key";

-- DropIndex
DROP INDEX "spaces_slug_key";

-- AlterTable
-- First add the column as nullable
ALTER TABLE "locations" ADD COLUMN "slug" TEXT;

-- Update existing rows to have a slug based on their name
UPDATE "locations" SET "slug" = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'));

-- Then make the column non-nullable
ALTER TABLE "locations" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "locations_slug_spaceId_key" ON "locations"("slug", "spaceId");

-- CreateIndex
CREATE UNIQUE INDEX "locations_name_spaceId_key" ON "locations"("name", "spaceId");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_locationId_name_key" ON "rooms"("locationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "spaces_name_createdBy_key" ON "spaces"("name", "createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "spaces_slug_createdBy_key" ON "spaces"("slug", "createdBy");
