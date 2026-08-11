-- DropIndex
DROP INDEX "State_name_key";

-- DropIndex
DROP INDEX "State_uf_key";

CREATE UNIQUE INDEX "State_name_active_unique"
ON "State" (LOWER("name"))
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX "State_uf_active_unique"
ON "State" (UPPER("uf"))
WHERE "deletedAt" IS NULL;