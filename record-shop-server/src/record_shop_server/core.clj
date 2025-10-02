(ns record-shop-server.core
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [ring.util.response :refer [response]]
            [ring.middleware.json :as json-middleware]
            [ring.middleware.params :as params-middleware]
            [ring.middleware.cors :refer [wrap-cors]]
            [record-shop-server.db :refer [get-genres
                                           get-decades
                                           get-by-genre
                                           get-by-decade
                                           get-recently-added
                                           get-album-details]]))

(defn genres-handler [request]
  (response
   (map #(:genre %) (get-genres))))

(defn decades-handler [request]
  (response
   (map #(:decade %) (get-decades))))

(defn by-genre-handler [{params :query-params}]
  (response (get-by-genre (get params "genre"))))

(defn by-decade-handler [{params :query-params}]
  (response (get-by-decade (Integer/parseInt (get params "decade")))))

(defn recently-added-handler [request]
  (response (get-recently-added)))

(defn album-details-handler [{params :query-params}]
  (response (get-album-details (get params "product_no"))))

(defn app [request]
  (case (:uri request)
    "/genres" (genres-handler request)
    "/decades" (decades-handler request)
    "/by-genre" (by-genre-handler request)
    "/by-decade" (by-decade-handler request)
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
