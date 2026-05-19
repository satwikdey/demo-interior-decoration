-- Add persistent ordering for portfolio projects
ALTER TABLE "Project" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- Preserve the existing createdAt-desc listing by backfilling explicit sort order
WITH ordered_projects AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (ORDER BY "createdAt" DESC) - 1 AS "row_index"
  FROM "Project"
)
UPDATE "Project"
SET "sortOrder" = (
  SELECT "row_index"
  FROM ordered_projects
  WHERE ordered_projects."id" = "Project"."id"
);
