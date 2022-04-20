DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  review_date DATE NOT NULL,
  product_id INT,
  rating INT NOT NULL,
  summary VARCHAR(255) NOT NULL,
  body VARCHAR(1024) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(60) NOT NULL,
  recommended BOOLEAN,
  reported BOOLEAN DEFAULT FALSE,
  helpfulness INT DEFAULT 0,
);

CREATE TABLE characteristics(
  char_id SERIAL PRIMARY KEY,
  product_id INT,
  characteristic VARCHAR(50),
  charvalue INT
);

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  review_id INT,
  url text[][][][][]
);


-- Define foreign keys
-- ALTER TABLE meta ADD CONSTRAINT FK_Meta_Reviews FOREIGN KEY (product_id) REFERENCES reviews (product_id);
-- ALTER TABLE recommendations ADD CONSTRAINT FK_Recommendation_Meta FOREIGN KEY (product_id) REFERENCES meta (product_id);
-- ALTER TABLE characteristics ADD CONSTRAINT FK_Recommendation_Meta FOREIGN KEY (product_id) REFERENCES meta (product_id);
-- ALTER TABLE photos ADD CONSTRAINT FK_Photo_Reviews FOREIGN KEY (product_id) REFERENCES reviews (product_id);

