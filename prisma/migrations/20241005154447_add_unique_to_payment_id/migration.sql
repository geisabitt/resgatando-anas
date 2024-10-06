/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `PaymentUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PaymentUser_paymentId_key" ON "PaymentUser"("paymentId");
