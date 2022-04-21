DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS photos;

CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id INT,
  rating INT NOT NULL,
  date VARCHAR(13),
  summary VARCHAR(255) NOT NULL,
  body VARCHAR(1024) NOT NULL,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(255) NOT NULL,
  response VARCHAR(1024) DEFAULT NULL,
  helpfulness INT DEFAULT 0
);

CREATE TABLE characteristics(
  id BIGSERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR(50)
);

CREATE TABLE characteristic_reviews(
  id BIGSERIAL PRIMARY KEY,
  product_id INT,
  review_id INT,
  value INT
);

CREATE TABLE photos (
  id BIGSERIAL PRIMARY KEY,
  review_id INT,
  url VARCHAR(255)
);


-- Define foreign keys
-- ALTER TABLE meta ADD CONSTRAINT FK_Meta_Reviews FOREIGN KEY (product_id) REFERENCES reviews (product_id);
-- ALTER TABLE recommendations ADD CONSTRAINT FK_Recommendation_Meta FOREIGN KEY (product_id) REFERENCES meta (product_id);
-- ALTER TABLE characteristics ADD CONSTRAINT FK_Recommendation_Meta FOREIGN KEY (product_id) REFERENCES meta (product_id);
-- ALTER TABLE photos ADD CONSTRAINT FK_Photo_Reviews FOREIGN KEY (product_id) REFERENCES reviews (product_id);

-- index

-- psql -p5433 "review"