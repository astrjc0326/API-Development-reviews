DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

USE review;

CREATE TABLE reviews (
  review_id bigserial,
  review_date date NOT NULL,
  product_id integer,
  rating integer NOT NULL,
  summary varchar(255) NOT NULL,
  body varchar(1024) NOT NULL,
  email varchar(255) NOT NULL,
  username varchar(60) NOT NULL,
  recommended BOOLEAN,
  reported BOOLEAN default 0,
  helpfulness integer default 0
);

CREATE TABLE meta(
  meta_id bigserial,
  product_id integer,
  rating1 integer,
  rating2 integer,
  rating3 integer,
  rating4 integer,
  rating5 integer,
)

CREATE TABLE recommendations(
  recommendation_id bigserial,
  product_id integer,
  false integer default 0,
  true integer default 0,
)

CREATE TABLE characteristics(
  id bigserial,
  product_id integer,
  characteristic varchar(50)
  value integer,
)

-- size
-- width
-- comfort
-- quality
-- length
-- fit

CREATE TABLE photos (
  photo_id Bigserial,
  review_id integer,
  url text[][][][][]
)

-- Define primary keys
ALTER TABLE reviews ADD PRIMARY KEY (review_id);
ALTER TABLE meta ADD PRIMARY KEY (meta_id);
ALTER TABLE recommendations ADD PRIMARY KEY (recommendation_id);
ALTER TABLE characteristics ADD PRIMARY KEY (id);
ALTER TABLE photos ADD PRIMARY KEY (photo_id);

-- Define foreign keys
ALTER TABLE meta ADD CONSTRAINT FK_Meta_Reviews FOREIGN KEY (product_id) REFERENCES reviews (product_id);
ALTER TABLE recommendations ADD CONSTRAINT FK_Recommendation_Meta FOREIGN KEY (product_id) REFERENCES meta (product_id);
ALTER TABLE characteristics ADD CONSTRAINT FK_Recommendation_Meta FOREIGN KEY (product_id) REFERENCES meta (product_id);
ALTER TABLE photos ADD CONSTRAINT FK_Photo_Reviews FOREIGN KEY (product_id) REFERENCES reviews (product_id);

