CREATE DATABASE IF NOT EXISTS abm_paises
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_bin;
USE abm_paises;

USE abm_paises;

--Create table for cities
CREATE TABLE `abm_paises`.`city` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `population` BIGINT,
  `area` FLOAT,
  `postal_code` VARCHAR(20),
  `is_coastal` BOOLEAN,
  `id_country` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_country`) REFERENCES country(`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

--Insert data/crate cities
INSERT INTO city (name, population, area, postal_code, is_coastal, id_country) VALUES
  ('Buenos Aires', 3000000, 203, 'C1000', TRUE, 1),
  ('Córdoba', 1400000, 576, 'X5000', FALSE, 1),
  ('Rio de Janeiro', 6748000, 1182, '20000-000', TRUE, 2),
  ('São Paulo', 12300000, 1521, '01000-000', FALSE, 2),
  ('Toronto', 2950000, 630, 'M5H', TRUE, 7),
  ('Vancouver', 2600000, 115, 'V5K', TRUE, 7),
  ('Lima', 8800000, 2672, 'L01', TRUE, 5),
  ('Santiago', 7000000, 641, '8320000', FALSE, 3);

/**Stored procedures**/


--Create new city
DELIMITER $$

CREATE PROCEDURE city_create(
  IN p_name VARCHAR(100),
  IN p_population BIGINT,
  IN p_area FLOAT,
  IN p_postal_code VARCHAR(20),
  IN p_is_coastal BOOLEAN,
  IN p_id_country INT
)
BEGIN
  INSERT INTO city (name, population, area, postal_code, is_coastal, id_country)
  VALUES (p_name, p_population, p_area, p_postal_code, p_is_coastal, p_id_country);
END $$

CREATE PROCEDURE city_get(IN p_id INT)
BEGIN
  SELECT * FROM city WHERE id = p_id;
END $$

CREATE PROCEDURE city_update(
  IN p_id INT,
  IN p_name VARCHAR(100),
  IN p_population BIGINT,
  IN p_area FLOAT,
  IN p_postal_code VARCHAR(20),
  IN p_is_coastal BOOLEAN,
  IN p_id_country INT
)
BEGIN
  UPDATE city
  SET name = p_name,
      population = p_population,
      area = p_area,
      postal_code = p_postal_code,
      is_coastal = p_is_coastal,
      id_country = p_id_country
  WHERE id = p_id;
END $$


--Delete a city
CREATE PROCEDURE city_delete(IN p_id INT)
BEGIN
  DELETE FROM city WHERE id = p_id;
END $$





--Countries with most populated city
CREATE PROCEDURE get_country_with_most_populated_city()
BEGIN
  SELECT c.name AS country_name
  FROM country c
  JOIN city ci ON c.id = ci.id_country
  ORDER BY ci.population DESC
  LIMIT 1;
END $$

--Countries with 1000000 population in coastal cities
CREATE PROCEDURE get_countries_with_large_coastal_cities()
BEGIN
  SELECT DISTINCT c.name AS country_name
  FROM country c
  JOIN city ci ON c.id = ci.id_country
  WHERE ci.is_coastal = TRUE AND ci.population > 1000000;
END $$

-- Country with city having highest population density
CREATE PROCEDURE get_city_with_highest_density()
BEGIN
  SELECT c.name AS country_name, ci.name AS city_name,
         (ci.population / ci.area) AS density
  FROM country c
  JOIN city ci ON c.id = ci.id_country
  ORDER BY density DESC
  LIMIT 1;
END $$

DELIMITER ;
