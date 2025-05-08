-- CreateTable
CREATE TABLE "FollowOrg" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,

    CONSTRAINT "FollowOrg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FollowOrg_userId_orgId_key" ON "FollowOrg"("userId", "orgId");

-- AddForeignKey
ALTER TABLE "FollowOrg" ADD CONSTRAINT "FollowOrg_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowOrg" ADD CONSTRAINT "FollowOrg_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
