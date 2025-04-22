-- CreateTable
CREATE TABLE "click" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "ip" TEXT,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "userAgent" TEXT,
    "utm_source" TEXT,
    "utm_campaign" TEXT,

    CONSTRAINT "click_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "click" ADD CONSTRAINT "click_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
