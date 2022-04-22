DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS photos;

CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id INT,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(255) NOT NULL,
  body VARCHAR(1024) NOT NULL,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(255) NOT NULL,
  response VARCHAR(1024) DEFAULT NULL,
  helpfulness INT DEFAULT 0
);

CREATE INDEX idx_r_product_id ON reviews(product_id);


CREATE TABLE characteristics(
  id BIGSERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR(50)
);

CREATE INDEX idx_char_product_id ON characteristics(product_id);

CREATE TABLE characteristic_reviews(
  id BIGSERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value INT
);

CREATE INDEX idx_char_rev_characteristic_id ON characteristic_reviews(characteristic_id);

CREATE TABLE photos (
  id BIGSERIAL PRIMARY KEY,
  review_id INT,
  url VARCHAR(255)
);

CREATE INDEX idx_photo_reviews_id ON photos(review_id);

-- psql -p5433 "review"
    SELECT
    json_agg(
      json_build_object(
        'review_id', id,
        'rating', rating,
        'date', date,
        'summary', summary,
        'body', body,
        'reviewer_name', reviewer_name,
        'recommend', recommend,
        'helpfulness', helpfulness,
        'response', response,
        'photos', (
          SELECT coalesce(json_agg(url), '[]'::json)
          FROM (
            SELECT url
            FROM photos
            WHERE review_id = r.id
          ) as photos
        )
      )
    ) as results
    FROM reviews r WHERE product_id = 1;



 SELECT AVG(value) FROM characteristic_reviews WHERE characteristic_id =1

 update reviews set date = to_timestamp(date,'YYYY-DD-MM HH:MI');
ALTER TABLE reviews
ALTER date SET DATA TYPE timestamp without time zone
USING timestamp without time zone 'epoch' + (date / 1000 ) * interval '1 second';
update reviews set date=to_timestamp(date,'YYYY-DD-MON-RRHH24:MI:SS.FF');
