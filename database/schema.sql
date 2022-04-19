DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

USE review;

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  summary varchar(255) NOT NULL,
  body varchar(1024) NOT NULL,
  -- photos
)

