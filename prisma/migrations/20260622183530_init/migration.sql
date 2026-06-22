-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('GASOLINE', 'DIESEL', 'HYBRID', 'ELECTRIC', 'FLEX', 'OTHER');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('AUTOMATIC', 'MANUAL', 'CVT', 'DUAL_CLUTCH');

-- CreateEnum
CREATE TYPE "BodyStyle" AS ENUM ('SEDAN', 'COUPE', 'SUV', 'TRUCK', 'HATCHBACK', 'CONVERTIBLE', 'WAGON', 'VAN', 'MINIVAN');

-- CreateEnum
CREATE TYPE "DriveType" AS ENUM ('FWD', 'RWD', 'AWD', 'FOUR_WD');

-- CreateEnum
CREATE TYPE "DamageStatus" AS ENUM ('CLEAN', 'MINOR', 'MODERATE', 'SEVERE', 'SALVAGE');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('DRAFT', 'ACTIVE', 'SOLD', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'CLOSED');

-- CreateEnum
CREATE TYPE "ImportStage" AS ENUM ('VEHICLE_FOUND', 'AUCTION_WON', 'PAYMENT_COMPLETED', 'SHIPPING', 'PORT_ARRIVAL', 'CUSTOMS_CLEARANCE', 'DELIVERY', 'COMPLETED');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'bs',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "trim" TEXT,
    "mileage" INTEGER NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "bodyStyle" "BodyStyle" NOT NULL,
    "driveType" "DriveType" NOT NULL,
    "exteriorColor" TEXT,
    "interiorColor" TEXT,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "vin" TEXT,
    "engine" TEXT,
    "cylinders" INTEGER,
    "condition" TEXT,
    "damageStatus" "DamageStatus" NOT NULL DEFAULT 'CLEAN',
    "damageNotes" TEXT,
    "auctionName" TEXT,
    "auctionDate" TIMESTAMP(3),
    "lotNumber" TEXT,
    "location" TEXT,
    "estimatedArrivalDays" INTEGER,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "VehicleStatus" NOT NULL DEFAULT 'DRAFT',
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleImage" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VehicleImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "vehicleId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalculationHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "input" JSONB NOT NULL,
    "totalUSD" INTEGER NOT NULL,
    "totalEUR" INTEGER NOT NULL,
    "totalBAM" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalculationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportOrder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "reference" TEXT NOT NULL,
    "currentStage" "ImportStage" NOT NULL DEFAULT 'VEHICLE_FOUND',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImportOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportStageEvent" (
    "id" TEXT NOT NULL,
    "importOrderId" TEXT NOT NULL,
    "stage" "ImportStage" NOT NULL,
    "note" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImportStageEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportDocument" (
    "id" TEXT NOT NULL,
    "importOrderId" TEXT,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImportDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuideContent" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuideContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecentlyViewed" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecentlyViewed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE INDEX "UserProfile_role_idx" ON "UserProfile"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_slug_key" ON "Vehicle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vin_key" ON "Vehicle"("vin");

-- CreateIndex
CREATE INDEX "Vehicle_make_model_idx" ON "Vehicle"("make", "model");

-- CreateIndex
CREATE INDEX "Vehicle_status_idx" ON "Vehicle"("status");

-- CreateIndex
CREATE INDEX "Vehicle_featured_idx" ON "Vehicle"("featured");

-- CreateIndex
CREATE INDEX "Vehicle_year_idx" ON "Vehicle"("year");

-- CreateIndex
CREATE INDEX "Vehicle_price_idx" ON "Vehicle"("price");

-- CreateIndex
CREATE INDEX "Vehicle_fuelType_idx" ON "Vehicle"("fuelType");

-- CreateIndex
CREATE INDEX "Vehicle_bodyStyle_idx" ON "Vehicle"("bodyStyle");

-- CreateIndex
CREATE INDEX "VehicleImage_vehicleId_idx" ON "VehicleImage"("vehicleId");

-- CreateIndex
CREATE INDEX "Favorite_userId_idx" ON "Favorite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_vehicleId_key" ON "Favorite"("userId", "vehicleId");

-- CreateIndex
CREATE INDEX "Inquiry_userId_idx" ON "Inquiry"("userId");

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");

-- CreateIndex
CREATE INDEX "Inquiry_vehicleId_idx" ON "Inquiry"("vehicleId");

-- CreateIndex
CREATE INDEX "CalculationHistory_userId_idx" ON "CalculationHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ImportOrder_reference_key" ON "ImportOrder"("reference");

-- CreateIndex
CREATE INDEX "ImportOrder_userId_idx" ON "ImportOrder"("userId");

-- CreateIndex
CREATE INDEX "ImportOrder_currentStage_idx" ON "ImportOrder"("currentStage");

-- CreateIndex
CREATE INDEX "ImportStageEvent_importOrderId_idx" ON "ImportStageEvent"("importOrderId");

-- CreateIndex
CREATE INDEX "ImportDocument_userId_idx" ON "ImportDocument"("userId");

-- CreateIndex
CREATE INDEX "ImportDocument_importOrderId_idx" ON "ImportDocument"("importOrderId");

-- CreateIndex
CREATE INDEX "ContactMessage_handled_idx" ON "ContactMessage"("handled");

-- CreateIndex
CREATE UNIQUE INDEX "GuideContent_slug_key" ON "GuideContent"("slug");

-- CreateIndex
CREATE INDEX "GuideContent_order_idx" ON "GuideContent"("order");

-- CreateIndex
CREATE INDEX "RecentlyViewed_userId_idx" ON "RecentlyViewed"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RecentlyViewed_userId_vehicleId_key" ON "RecentlyViewed"("userId", "vehicleId");

-- AddForeignKey
ALTER TABLE "VehicleImage" ADD CONSTRAINT "VehicleImage_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalculationHistory" ADD CONSTRAINT "CalculationHistory_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportOrder" ADD CONSTRAINT "ImportOrder_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportStageEvent" ADD CONSTRAINT "ImportStageEvent_importOrderId_fkey" FOREIGN KEY ("importOrderId") REFERENCES "ImportOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportDocument" ADD CONSTRAINT "ImportDocument_importOrderId_fkey" FOREIGN KEY ("importOrderId") REFERENCES "ImportOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentlyViewed" ADD CONSTRAINT "RecentlyViewed_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
