const db = require('../db');
// const db = require('../database/mongodb');
module.exports = {
  getReview: (productID, callback) => {
    const query = `
    SELECT
    json_agg(
      json_build_object(
        'review_id', r.id,
        'rating', r.rating,
        'date', r.date,
        'summary', r.summary,
        'body', r.body,
        'reviewer_name', r.reviewer_name,
        'recommend', r.recommend,
        'helpfulness', r.helpfulness,
        'response', r.response,
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
    FROM (SELECT * FROM reviews WHERE product_id = $1 AND reported=false) as r;
    `;
    db.pool.query(query, [productID], (err, result) => {
      if (result) {
        callback(null, result.rows);
      } else {
        callback(err);
      }
    });
  },
  getMeta: (productID, callback) => {
    const query = `
    SELECT json_build_object(
      'product_id', product_id,
       'ratings',
          (SELECT json_object_agg(rating, num_reviews)
          FROM (SELECT rating, count(*) as num_reviews from reviews
          WHERE product_id = $1 GROUP BY rating) r ),
       'recommended',
          (SELECT json_object_agg(
          recommend,
          num_reviews
          ) FROM (SELECT recommend, count(*) as num_reviews FROM reviews WHERE product_id = $1 group by recommend) re),
      'characteristics',
        (SELECT json_object_agg(
        name,
        json_build_object(
          'id', id,
          'value', value
          )
        )
      FROM ( SELECT c.name, c.id, sum(value)/count(*) as value
      FROM characteristics c
      FULL OUTER JOIN characteristic_reviews cr
      ON c.id = cr.characteristic_id
      WHERE c.product_id = $1
      GROUP BY c.name, c.id
        ) r
      )
     ) as results
    FROM reviews WHERE product_id = $1 ;
    `;
    db.pool.query(query, [productID], (err, result) => {
      if (!err) {
        callback(null, result.rows);
      } else {
        callback(err);
      }
    });
  },
  postReview: (review, photos, characteristics, callback) => {
    const query = `
    INSERT INTO reviews
    (id, date, product_id, rating, summary, body, reviewer_email, reviewer_name, recommend, helpfulness) VALUES
    ((SELECT count(id) FROM reviews)+1, $1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    const photoquery = `
    INSERT INTO photos (id, review_id, url) VALUES ((SELECT count(id) FROM photos)+1+$2, (SELECT count(id) FROM reviews), $1)`;
    const characteristicQuery = `
    INSERT INTO characteristic_reviews (id, characteristic_id, review_id, value) VALUES ((SELECT count(id) FROM characteristic_reviews)+1+$3, $1, (SELECT count(id) FROM reviews), $2);
    `;
    db.pool.query(query, review, (err, result) => {
      if (!err) {
        if (photos.length === 0 && Object.keys(characteristics).length === 0) {
          return callback(null, result);
        }
        photos.forEach(async (photo, index) => {
          await db.pool.query(photoquery, [photo, index], (error) => {
            if (error) { return callback(error); } if (Object.keys(characteristics).length === 0) {
              return callback(null);
            }
            Object.keys(characteristics).forEach(async (characteristic, ind) => {
              const num = characteristic.toString();
              await db.pool.query(
                characteristicQuery,
                [characteristic, Number(characteristics[num]), ind],
                (error1) => {
                  if (error1) {
                    return callback(error1);
                  }
                },
              );
            });
          });
        });
        return callback(null, result);
      }
      callback(err);
    });
  },
  putReviewHelpful: (reviewID, callback) => {
    const query = `
    UPDATE reviews SET helpfulness = (SELECT helpfulness FROM reviews WHERE id=$1) +1 where id=$1;
    `;
    db.pool.query(query, [reviewID], (err, result) => {
      callback(err, result);
    });
  },
  reportReview: (reviewID, callback) => {
    const query = `
    UPDATE reviews SET reported=true WHERE id=$1`;
    db.pool.query(query, [reviewID], (err, result) => {
      callback(err, result);
    });
  },
};
