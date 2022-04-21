\c review;
\copy reviews FROM './csv/reviews.csv' WITH (FORMAT CSV, HEADER);
--5774952 totals
\copy photos FROM './csv/reviews_photos.csv' WITH (FORMAT CSV, HEADER);
--2742540 totals
\copy characteristics FROM './csv/characteristics.csv' WITH (FORMAT CSV, HEADER);
--3347679 totals
\copy characteristic_reviews FROM './csv/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);
--19327575 totals