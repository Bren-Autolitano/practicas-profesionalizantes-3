CREATE DATABASE IF NOT EXISTS country_db
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_bin;
USE country_db;


CREATE TABLE `abm_paises`.`country` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NOT NULL,
  `language` VARCHAR(100) NULL,
  `capital` VARCHAR(100) NULL,
  `surface` FLOAT NULL,
  `population` BIGINT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

--Insert/create countries into db
INSERT INTO country (id, name, language, capital, surface, population)
VALUES (1, 'Argentina', 'Spanish', 'Buenos Aires', 2780000, 47000000);
VALUES (2, 'Brazil', 'Portuguese', 'Brasília', 8515767, 213000000);
VALUES (3, 'Chile', 'Spanish', 'Santiago', 756102, 19000000);
VALUES (4, 'Colombia', 'Spanish', 'Bogotá', 1141748, 51000000);
VALUES (5, 'Peru', 'Spanish', 'Lima', 1285216, 33000000); 
VALUES (6, 'United States', 'English', 'Washington, D.C.', 9833517, 331000000);
VALUES (7, 'Canada', 'English/French', 'Ottawa', 9984670, 38000000);      

--Read data from db
SELECT * FROM country WHERE id = 1;

--Update a country 
UPDATE country
SET name = 'Argentina',
    language = 'Spanish',
    capital = 'Buenos Aires',
    surface = 2780000,
    population = 48000000 --nacieron 10 millones más por escasez de proteccion 
WHERE id = 1;

--Delete a country
DELETE FROM country WHERE id = 1;
