-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "subscriber" BOOLEAN NOT NULL DEFAULT false,
    "dateRegistered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateLastLoggedIn" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_authId_key" ON "users"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
