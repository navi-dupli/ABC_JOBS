-- Crear la estructura de la tabla cities en PostgreSQL
CREATE TABLE IF NOT EXISTS cities
(
  id         SERIAL PRIMARY KEY,
  region_id  INT            NOT NULL,
  country_id SMALLINT       NOT NULL,
  latitude   DECIMAL(10, 8) NOT NULL,
  longitude  DECIMAL(11, 8) NOT NULL,
  name       VARCHAR(255)   NOT NULL
);

-- Crear el índice en PostgreSQL (equivalente a la clave en MySQL)
CREATE INDEX country_region_name ON cities (country_id, region_id, name);

-- Crear la estructura de la tabla regions en PostgreSQL
CREATE TABLE IF NOT EXISTS regions
(
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  code       VARCHAR(10)  NOT NULL,
  country_id SMALLINT     NOT NULL
);

-- Crear el índice en PostgreSQL (equivalente a la clave en MySQL)
CREATE INDEX country_name ON regions (country_id, name);


-- Crear la estructura de la tabla countries en PostgreSQL
CREATE TABLE IF NOT EXISTS countries
(
  id   SMALLINT     NOT NULL GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (name)
);

