-- Adminer 4.8.1 PostgreSQL 10.14 dump

DROP TABLE IF EXISTS "SequelizeMeta";
CREATE TABLE "public"."SequelizeMeta" (
    "name" character varying(255) NOT NULL,
    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
) WITH (oids = false);

INSERT INTO "SequelizeMeta" ("name") VALUES
('20220603062331-create-users.js'),
('20220603062527-create-products.js'),
('20220603062837-create-orders.js'),
('20220603062934-create-order-details.js');

DROP TABLE IF EXISTS "items";
DROP SEQUENCE IF EXISTS products_id_seq;
CREATE SEQUENCE products_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 7 CACHE 1;

CREATE TABLE "public"."items" (
    "id" integer DEFAULT nextval('products_id_seq') NOT NULL,
    "code" character varying(255),
    "title" character varying(255),
    "price" integer,
    "qty" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    "updated_by" integer,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "items" ("id", "code", "title", "price", "qty", "created_at", "updated_at", "updated_by") VALUES
(4,	'P003',	'Product 3',	27500,	12,	'2022-06-13 08:16:41.199+07',	'2022-06-13 08:16:41.199+07',	NULL),
(5,	'P004',	'Product 4',	31700,	12,	'2022-06-13 08:17:10.621+07',	'2022-06-13 08:17:10.621+07',	NULL),
(6,	'P001',	'Product 1',	28500,	12,	'2022-06-13 08:19:02.338+07',	'2022-06-13 08:20:45.63+07',	NULL),
(2,	'P002',	'Product 2',	28500,	12,	'2022-06-03 15:30:58.367+07',	'2022-06-16 13:31:50.118+07',	NULL),
(7,	'P005',	'Product 5',	35500,	12,	'2022-06-16 13:31:20.011+07',	'2022-06-16 14:48:05.698+07',	NULL);

DROP TABLE IF EXISTS "order_details";
DROP SEQUENCE IF EXISTS order_details_id_seq;
CREATE SEQUENCE order_details_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 37 CACHE 1;

CREATE TABLE "public"."order_details" (
    "id" integer DEFAULT nextval('order_details_id_seq') NOT NULL,
    "order_id" integer,
    "item_id" integer,
    "price" integer,
    "qty" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    CONSTRAINT "order_details_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "order_details" ("id", "order_id", "item_id", "price", "qty", "created_at", "updated_at") VALUES
(12,	10,	6,	28500,	1,	'2022-06-13 13:45:50.878+07',	'2022-06-13 13:45:50.878+07'),
(13,	10,	4,	27500,	1,	'2022-06-13 13:45:50.879+07',	'2022-06-13 13:45:50.879+07'),
(14,	11,	6,	28500,	2,	'2022-06-13 13:46:27.062+07',	'2022-06-13 13:46:27.062+07'),
(15,	11,	4,	27500,	1,	'2022-06-13 13:46:27.062+07',	'2022-06-13 13:46:27.062+07');

DROP TABLE IF EXISTS "orders";
DROP SEQUENCE IF EXISTS orders_id_seq;
CREATE SEQUENCE orders_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 22 CACHE 1;

CREATE TABLE "public"."orders" (
    "id" integer DEFAULT nextval('orders_id_seq') NOT NULL,
    "user_id" integer,
    "total" integer,
    "status" character varying,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    "updated_by" integer,
    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "orders" ("id", "user_id", "total", "status", "created_at", "updated_at", "updated_by") VALUES
(10,	1,	56000,	'PAID',	'2022-06-13 13:45:50.625+07',	'2022-06-16 14:24:03.1+07',	1),
(11,	1,	84500,	'PAID',	'2022-06-13 13:46:27.018+07',	'2022-06-16 14:26:11.48+07',	1);

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 7 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "username" character varying(255),
    "name" character varying(255),
    "email" character varying(255),
    "password" character varying(255),
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    "updated_by" integer,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "username", "name", "email", "password", "created_at", "updated_at", "updated_by") VALUES
(3,	'admin1',	'admin 1',	'admin@gmail.com',	'$2b$10$8MqN8GzzLZvReBdq1J9erO8beioKAVQ.deEh5AHMnXyI.hCE/s.yO',	'2022-06-13 08:49:27.207+07',	'2022-06-13 08:49:27.423+07',	NULL),
(4,	'admin3',	'Admin 3',	'admin3@gmail.com',	'$2a$12$U6Zv530wUMh1LfN.1e8Fz.LfI.xlYeHaTiUEVM41unNjnQs0KAyuu',	'2022-06-13 10:15:42.527+07',	'2022-06-13 10:15:42.527+07',	NULL),
(5,	'admin4',	'admin 4',	'admin@gmail.com',	'$2b$10$FOLELE4wuz.6eWxMKy8NbeRehz0ye0N/wrlMhspU9OxCTJwXO6OJy',	'2022-06-15 09:25:56.347+07',	'2022-06-15 09:25:56.614+07',	NULL),
(1,	'admin2',	'Admin 2',	'admin2@gmail.com',	'$2a$12$sLwerDdiO2lWi1h751.3N.gZNHWF96M6TJrnFcGHzogSLO1xt43vu',	'2022-06-03 14:42:39.667+07',	'2022-06-16 15:19:09.837+07',	NULL);

ALTER TABLE ONLY "public"."order_details" ADD CONSTRAINT "order_details_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."order_details" ADD CONSTRAINT "order_details_product_id_fkey" FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2022-06-16 15:27:37.905204+07
