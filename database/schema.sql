DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

USE review;

CREATE TABLE reviews (
  id integer NOT NULL AUTO_INCREMENT,
  rating integer NOT NULL,
  summary varchar(255) NOT NULL,
  body varchar(1024) NOT NULL,
  email varchar(255) NOT NULL,
  username varchar(60) NOT NULL,
  reported BOOLEAN default 0,
  helpfulness integer default 0
);

-- CREATE TABLE meta(

-- )

CREATE TABLE photos (
  id integer NOT NULL AUTO_INCREMENT,
  review_id integer,
  url text[][][][][]
)

