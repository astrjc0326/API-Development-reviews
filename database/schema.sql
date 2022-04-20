DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  review_date DATE NOT NULL,
  product_id INT,
  rating INT NOT NULL,
  summary varchar(255) NOT NULL,
  body varchar(1024) NOT NULL,
  email varchar(255) NOT NULL,
  username varchar(60) NOT NULL,
  recommended BOOLEAN,
  reported BOOLEAN DEFAULT FALSE,
  helpfulness INT DEFAULT 0
);

CREATE TABLE meta(
  meta_id SERIAL PRIMARY KEY,
  product_id integer,
  rating1 integer,
  rating2 integer,
  rating3 integer,
  rating4 integer,
  rating5 integer
);

CREATE TABLE recommendations(
  recommendation_id SERIAL PRIMARY KEY,
  product_id integer,
  notrecom integer default 0,
  recom integer default 0
);

CREATE TABLE characteristics(
  char_id SERIAL PRIMARY KEY,
  product_id INT,
  characteristic varchar(50),
  charvalue INT
);

-- size
-- width
-- comfort
-- quality
-- length
-- fit

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  review_id integer,
  url text[][][][][]
);


-- Define foreign keys
-- ALTER TABLE meta ADD CONSTRAINT FK_Meta_Reviews FOREIGN KEY (product_id) REFERENCES reviews (product_id);
-- ALTER TABLE recommendations ADD CONSTRAINT FK_Recommendation_Meta FOREIGN KEY (product_id) REFERENCES meta (product_id);
-- ALTER TABLE characteristics ADD CONSTRAINT FK_Recommendation_Meta FOREIGN KEY (product_id) REFERENCES meta (product_id);
-- ALTER TABLE photos ADD CONSTRAINT FK_Photo_Reviews FOREIGN KEY (product_id) REFERENCES reviews (product_id);

