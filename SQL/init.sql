CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS app_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY(uuid)
);

INSERT INTO app_user (username, password)
VALUES
('admin', crypt('admin', 'my_salt'));