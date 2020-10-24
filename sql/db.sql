CREATE TABLE IF NOT EXISTS events(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    place character varying(255) NOT NULL,
    start_time timestamptz NOT NULL
);
ALTER TABLE events ADD COLUMN created_at TIMESTAMPTZ;
ALTER TABLE events ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE events ADD COLUMN updated_at TIMESTAMPTZ;
ALTER TABLE events ALTER COLUMN updated_at SET DEFAULT now();

CREATE TYPE role_enum AS ENUM('admin','teacher','student');
CREATE TABLE IF NOT EXISTS users
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    role role_enum,
    can_login boolean DEFAULT false,
    password character varying(255) DEFAULT NULL,
    phone character varying(20) DEFAULT NULL,
    active boolean DEFAULT true,
    UNIQUE (email)
);
ALTER TABLE users ADD COLUMN created_at TIMESTAMPTZ;
ALTER TABLE users ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE users ADD COLUMN updated_at TIMESTAMPTZ;
ALTER TABLE users ALTER COLUMN updated_at SET DEFAULT now();

CREATE TYPE status_enum AS ENUM('unpaid','paid','free');
CREATE TABLE IF NOT EXISTS invoices
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    payment_date timestamptz,
    amount float NOT NULL,
    description text NOT NULL,
    status status_enum DEFAULT 'unpaid',
    user_id integer,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
        NOT VALID
);
ALTER TABLE invoices ADD COLUMN created_at TIMESTAMPTZ;
ALTER TABLE invoices ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE invoices ADD COLUMN updated_at TIMESTAMPTZ;
ALTER TABLE invoices ALTER COLUMN updated_at SET DEFAULT now();

CREATE TABLE IF NOT EXISTS "event_users" (
    "event_id" INTEGER NOT NULL REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("event_id","user_id") 
);

CREATE TABLE IF NOT EXISTS groups(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    active boolean DEFAULT true
);
ALTER TABLE groups ADD COLUMN created_at TIMESTAMPTZ;
ALTER TABLE groups ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE groups ADD COLUMN updated_at TIMESTAMPTZ;
ALTER TABLE groups ALTER COLUMN updated_at SET DEFAULT now();

CREATE TABLE IF NOT EXISTS "group_users" (
    "group_id" INTEGER NOT NULL REFERENCES "groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    group_role role_enum,
    PRIMARY KEY ("group_id","user_id") 
);