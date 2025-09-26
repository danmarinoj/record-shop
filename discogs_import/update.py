import os
import discogs_client
import psycopg

def get_metadata(discogs, release_id):
    release = discogs.release(release_id)
    for genre in release.genres:
        yield {
            "genre": genre,
            "year": release.year,
            "format": release.formats[0]["name"]
        }

def get_new_releases(conn):
    with conn.cursor() as cur:
        cur.execute("""SELECT discogs_id FROM release
        LEFT JOIN music_inventory
        ON discogs_id=release_id
        WHERE release_id IS NULL""")
        for tuple_result in cur:
            release_id = tuple_result[0]
            yield release_id

def insert_item(conn, release_id):
    with conn.cursor() as cur:
        cur.execute(
            f"""INSERT INTO music_inventory (name, artist, year, price, release_id)
            SELECT discogs_title, d_artist, year, 0, discogs_id FROM release
            INNER JOIN
            (SELECT * FROM release_metadata WHERE release_id = {release_id} LIMIT 1)
            ON release_id = discogs_id""")
    conn.commit()
            
def insert_metadata(conn, release_id, metadata):
    with conn.cursor() as cur:
        for metadata_item in metadata:
            cur.execute(
                """INSERT INTO release_metadata (release_id, genre, year, format)
                VALUES (%s, %s, %s, %s)""",
                (
                    release_id,
                    metadata_item["genre"],
                    metadata_item["year"],
                    metadata_item["format"]
                )
            )
    conn.commit()

def main():
    pg_pass = os.getenv("DD_USER_PASSWORD")
    discogs_token = os.getenv("DISCOGS_TOKEN")
    discogs = discogs_client.Client('dd_records', user_token=discogs_token)

    with psycopg.connect(
            f"host=localhost dbname=shop user=dd_user password={pg_pass}"
    ) as conn:
        new_releases = get_new_releases(conn)
        for release_id in new_releases:
            metadata = get_metadata(discogs, release_id)
            insert_metadata(conn, release_id, metadata)
            insert_item(conn, release_id)
            
if __name__ == "__main__":
    main()
