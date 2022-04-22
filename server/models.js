const db = require('../db');
// const db = require('../database/mongodb');
module.exports = {
  getReview: (productID, callback) => {
    const query = `
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
    FROM reviews r WHERE product_id = $1;
    `;
    db.pool.query(query, [productID], (err, result) => {
      if (result) {
        callback(null, result.rows);
      }
      else {
        callback(null);
      }
      console.log(err);
    });
  },
  getMeta: (productID, callback) => {
    const query = `
    SELECT json_build_object(
      'product_id', product_id,
       'ratings',
           (SELECT json_object_agg(rating,num_reviews)
              FROM (SELECT rating, count(*) as num_reviews from reviews
                  WHERE product_id = $1 GROUP BY rating) r),
       'recommended',
            (SELECT json_object_agg(recommend,num_reviews)
            FROM (SELECT recommend, count(*) as num_reviews FROM reviews
             WHERE product_id = $1 group by recommend) re),
      'characteristics',
             (SELECT json_object_agg
             ( name, json_build_object(
                    'id', id,
                    'value', value
                 ))
            FROM (
              SELECT  c.name,  c.id, sum(value)/count(*) as value
              FROM characteristics c
              LEFT JOIN characteristic_reviews cr
              ON c.id = cr.characteristic_id
              WHERE c.product_id = $1
              GROUP BY  c.name, c.id
                ) r
            )
     ) as results
    FROM reviews
    WHERE product_id = $1 ;
    `;
    db.pool.query(query, [productID], (err, result) => {
      if (!err) {
        callback(null, result.rows);
      }
    });
  },
  postReview: (review, photos, characteristics, callback) => {
    const query = `
    INSERT INTO reviews
    (id, date, product_id, rating, summary, body, reviewer_email, reviewer_name, recommend, helpfulness) VALUES
    (5774953, $1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    db.pool.query(query, review, (err, result) => {
      if (!err) {
        console.log(result);
        callback(null, result);
      } else {
        console.log(err);
      }
    });
    /* insert into reviews (review_date, product_id, rating, summary, body,
    reviewer_email, reviewer_name, recommend, reported, helpfulness, response) values
    ('2008-11-11', 1, 5, 'apple', 'apple',
    'apple', 'apple', true, false, 0, 'apple'); */
  },
  putReviewHelpful: (reviewID, callback) => {
    const query = `
    SELECT
    `;
    db.pool.query(query, reviewID, (err, result) => {

    });
  },
  reportReview: (reviewID, callback) => {
    res.send('report a reviews');
  },
};
