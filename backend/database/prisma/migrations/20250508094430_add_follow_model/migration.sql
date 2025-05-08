-- AlterTable
CREATE SEQUENCE followorg_id_seq;
ALTER TABLE "FollowOrg" ALTER COLUMN "id" SET DEFAULT nextval('followorg_id_seq');
ALTER SEQUENCE followorg_id_seq OWNED BY "FollowOrg"."id";
