\c review;
\copy reviews FROM './csv/reviews.csv' WITH (FORMAT CSV, HEADER);
--5774952 totals
\copy photos FROM './csv/reviews_photos.csv' WITH (FORMAT CSV, HEADER);
--2742540 totals
\copy characteristics FROM './csv/characteristics.csv' WITH (FORMAT CSV, HEADER);
--3347679 totals
\copy characteristic_reviews FROM './csv/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);
--19327575 totals

-- need to not import the first column from the data

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
     )
    FROM reviews
    WHERE product_id = $1 ;