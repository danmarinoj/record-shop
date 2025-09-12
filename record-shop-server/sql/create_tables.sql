CREATE TABLE music_inventory (
product_no BIGSERIAL PRIMARY KEY,
name TEXT,
artist TEXT,
year INTEGER,
price REAL,
insertion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

GRANT SELECT, INSERT, DELETE ON music_inventory TO dd_user;
GRANT USAGE, SELECT, UPDATE ON music_inventory_product_no_seq TO dd_user;
