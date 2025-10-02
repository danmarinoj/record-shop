CREATE TABLE music_inventory (
product_no BIGSERIAL PRIMARY KEY,
name TEXT,
artist TEXT,
year INTEGER,
price INTEGER,			-- this is in cents
release_id BIGINT,
insertion_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

GRANT SELECT, INSERT, DELETE ON music_inventory TO dd_user;
GRANT USAGE, SELECT, UPDATE ON music_inventory_product_no_seq TO dd_user;

-- DISCODOS TABLES

GRANT SELECT ON collection TO dd_user;
GRANT SELECT ON release TO dd_user;
GRANT SELECT ON sales TO dd_user;
GRANT SELECT ON track TO dd_user;

-- collection
-- d_coll_instance_id      | bigint |           | not null | 
-- d_coll_release_id       | bigint |           |          | 
-- d_coll_folder_id        | bigint |           |          | 
-- d_coll_added            | text   |           |          | 
-- d_coll_rating           | text   |           |          | 
-- d_coll_notes            | text   |           |          | 
-- coll_sold               | bigint |           |          | '0'::bigint
-- coll_d_sales_listing_id | bigint |           |          | 
-- coll_orphaned           | bigint |           |          | '0'::bigint
-- coll_mtime              | text   |           |          | 
-- Indexes:
--     "idx_16441_collection_pkey" PRIMARY KEY, btree (d_coll_instance_id)

-- release
-- discogs_id        | bigint |           | not null | 
-- discogs_title     | text   |           |          | 
-- import_timestamp  | text   |           |          | 
-- d_artist          | text   |           |          | 
-- m_rel_id          | text   |           |          | 
-- m_rel_id_override | text   |           |          | 
-- m_match_method    | text   |           |          | 
-- m_match_time      | text   |           |          | 
-- d_catno           | text   |           |          | 
-- Indexes:
--     "idx_16410_release_pkey" PRIMARY KEY, btree (discogs_id)

-- sales (empty right now, how to join?)
-- d_sales_listing_id       | bigint |           | not null | 
-- d_sales_release_id       | bigint |           |          | 
-- d_sales_release_url      | text   |           |          | 
-- d_sales_url              | text   |           |          | 
-- d_sales_condition        | text   |           |          | 
-- d_sales_sleeve_condition | text   |           |          | 
-- d_sales_price            | real   |           |          | 
-- d_sales_comments         | text   |           |          | 
-- d_sales_allow_offers     | bigint |           |          | 
-- d_sales_status           | text   |           |          | 
-- d_sales_comments_private | text   |           |          | 
-- d_sales_counts_as        | bigint |           |          | 
-- d_sales_location         | text   |           |          | 
-- d_sales_weight           | real   |           |          | 
-- d_sales_posted           | text   |           |          | 
-- sales_sold               | bigint |           |          | '0'::bigint
-- sales_mtime              | text   |           |          | 
-- Indexes:
--     "idx_16435_sales_pkey" PRIMARY KEY, btree (d_sales_listing_id)

-- track
-- d_release_id     | bigint |           | not null | 
-- d_track_no       | text   |           | not null | 
-- d_artist         | text   |           |          | 
-- d_track_name     | text   |           |          | 
-- import_timestamp | text   |           |          | 
-- m_rec_id         | text   |           |          | 
-- m_match_method   | text   |           |          | 
-- m_match_time     | text   |           |          | 
-- a_key            | text   |           |          | 
-- a_chords_key     | text   |           |          | 
-- a_bpm            | real   |           |          | 
-- Indexes:
--     "idx_16425_sqlite_autoindex_track_1" PRIMARY KEY, btree (d_release_id, d_track_no)

-- What I want:
-- collection
-- * d_coll_notes
-- * d_coll_release_id -> join with release.discogs_id
-- * coll_d_sales_listing_id -> join with sales.d_sales_listing_id

-- release
-- * discogs_id -> join with collection.release_id and track.d_release_id
-- * discogs_title
-- * d_artist

-- sales
-- * d_sales_release_id -> join with collection.coll_d_sales_listing_id
-- * d_sales_sleeve_condition
-- * d_sales_price
-- * d_sales_comments
-- * d_sales_status

-- track
-- * d_release_id -> join with collection.release_id and release.discogs_id
-- * d_track_no
-- * d_artist (kind of extra here)
-- * d_track_name

CREATE TABLE release_metadata (
release_id BIGINT PRIMARY KEY,
genre TEXT,
year INTEGER,
format TEXT
);
GRANT SELECT, INSERT ON release_metadata TO dd_user;

CREATE TABLE decades (
decade INTEGER PRIMARY KEY
);
GRANT SELECT, INSERT ON decades TO dd_user;

-- pgloader command (inefficient since recreates all every time)
-- pgloader --with "create no tables" --with truncate sqlite:///path/to/.discodos/discobase.db pgsql://postgres:$POSTGRES_PASSWORD@localhost/shop
