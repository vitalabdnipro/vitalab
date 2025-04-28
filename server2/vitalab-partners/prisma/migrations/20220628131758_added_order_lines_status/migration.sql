-- CreateEnum
CREATE TYPE "OrderLineStatus" AS ENUM ('FAILED', 'NEW', 'SENT', 'COMPLETED');

-- AlterTable
ALTER TABLE "order_lines" ADD COLUMN     "status" "OrderLineStatus" NOT NULL DEFAULT E'NEW';
