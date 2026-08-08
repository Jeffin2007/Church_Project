-- AlterEnum
ALTER TYPE "FamilyRelationship" ADD VALUE IF NOT EXISTS 'IN_LAW';

-- CreateTable
CREATE TABLE IF NOT EXISTS "member_registration_drafts" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "draftData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_registration_drafts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "member_registration_drafts_familyId_key" ON "member_registration_drafts"("familyId");
