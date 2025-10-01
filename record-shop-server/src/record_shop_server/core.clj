(ns record-shop-server.core
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [ring.util.response :refer [response]]
            [ring.middleware.json :as json-middleware]
            [ring.middleware.params :as params-middleware]
            [ring.middleware.cors :refer [wrap-cors]]
            [record-shop-server.db :refer [db-spec]]
            [clojure.java.jdbc :as jdbc]))

(defn get-recently-added []
  (jdbc/query db-spec ["SELECT product_no, name, artist, year, price FROM music_inventory ORDER BY insertion_timestamp DESC LIMIT 6"]))

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

(defn recently-added-handler [request]
  (response (get-recently-added)))

(defn album-details-handler [{params :query-params}]
  (response (get-album-details (get params "product_no"))))

(defn app [request]
  (case (:uri request)
    "/recently-added" (recently-added-handler request)
    "/album-details" (album-details-handler request)
    (response {:error "Not found"})))

(defn -main []
  (run-jetty (-> app
                 json-middleware/wrap-json-response
                 params-middleware/wrap-params
                 (wrap-cors
                  :access-control-allow-origin [#"http://localhost:3000"]
                  :access-control-allow-methods [:get :post :put :delete]))
             {:port 3001}))

;; [{"product_no":8,"name":"One Foot In The Gutter: A Treasury Of Soul","artist":"The Dave Bailey Sextet","year":1995,"price":0},{"product_no":7,"name":"Down On The Farm","artist":"Little Feat","year":1979,"price":0},{"product_no":6,"name":"Fuego","artist":"Phish","year":2014,"price":0},{"product_no":5,"name":"Tales From Topographic Oceans","artist":"Yes","year":1976,"price":0},{"product_no":4,"name":"Concert By The Sea","artist":"Erroll Garner","year":1970,"price":0},{"product_no":3,"name":"Endless Summer","artist":"The Beach Boys","year":0,"price":0}]

;; {
;;   "tracks": [
;;     {
;;       "track_number": "A1",
;;       "track_name": "One Foot In The Gutter"
;;     },
;;     {
;;       "track_number": "A2",
;;       "track_name": "Well You Needn't"
;;     },
;;     {
;;       "track_number": "B1",
;;       "track_name": "Sandu"
;;     }
;;   ],
;;   "name": "One Foot In The Gutter: A Treasury Of Soul",
;;   "artist": "The Dave Bailey Sextet",
;;   "year": 1995,
;;   "price": 0
;; }
