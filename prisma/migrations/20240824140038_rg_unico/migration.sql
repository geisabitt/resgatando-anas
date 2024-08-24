/*
  Warnings:

  - A unique constraint covering the columns `[rg]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_rg_key" ON "Users"("rg");
