(ns record-shop-server.db
  (:require [clojure.java.jdbc :as jdbc]))

(def db-spec
  {:dbtype "postgresql"
   :dbname "shop"
   :host "localhost"
   :port 5432
   :user "dd_user"
   :password (System/getenv "DD_USER_PASSWORD")})

(def summary-columns "product_no, name, artist, year, price")

(defn get-genres []
  (jdbc/query db-spec ["SELECT DISTINCT genre FROM release_metadata"]))

(defn get-decades []
  (jdbc/query db-spec ["SELECT decade FROM decades ORDER BY decade ASC"]))

(defn get-by-genre [genre]
  (jdbc/query db-spec [(str "SELECT DISTINCT "
                            summary-columns
                            " FROM music_inventory AS A INNER JOIN "
                            "(SELECT release_id FROM release_metadata WHERE genre = '"
                            genre
                            "') AS B on A.release_id = B.release_id")]))

(defn get-by-decade [decade]
  (jdbc/query db-spec [(str "SELECT DISTINCT "
                            summary-columns
                            " FROM music_inventory AS A INNER JOIN "
                            "(SELECT release_id FROM release_metadata WHERE year BETWEEN "
                            decade " AND " (+ decade 9)
                            ") AS B on A.release_id = B.release_id")]))

(defn get-recently-added []
  (jdbc/query db-spec [(str "SELECT "
                            summary-columns
                            " FROM music_inventory ORDER BY insertion_timestamp DESC LIMIT 6")]))

(defn get-album-details [product-number]
  (merge
   {:tracks
    (jdbc/query db-spec [(str "SELECT d_track_no AS track_number, d_track_name AS track_name "
                              "FROM track INNER JOIN ("
                              "SELECT release_id FROM music_inventory WHERE product_no = "
                              product-number
                              ") ON release_id = d_release_id ORDER BY track_number ASC")])}
   (first
    (jdbc/query db-spec [(str
                          "SELECT name, artist, year, price FROM music_inventory WHERE product_no = "
                          product-number)]))))
