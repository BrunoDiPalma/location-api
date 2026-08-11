-- DropIndex
DROP INDEX "City_name_stateId_key";

CREATE UNIQUE INDEX "City_name_stateId_active_unique"
ON "City" (LOWER("name"), "stateId")
WHERE "deletedAt" IS NULL;