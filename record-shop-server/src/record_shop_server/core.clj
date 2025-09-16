(ns record-shop-server.core
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [ring.util.response :refer [response]]
            [ring.middleware.json :as json-middleware]
            [ring.middleware.cors :refer [wrap-cors]]
            [record-shop-server.db :refer [db-spec]]
            [clojure.java.jdbc :as jdbc]))

(defn get-recently-added []
  ;; (jdbc/query db-spec ["SELECT name, artist, year, price FROM music_inventory ORDER BY insertion_timestamp DESC LIMIT 6"])
  (print "serving request")
  '(
    {
     :name "Magical Mystery Tour"
     :artist "The Beatles"
     :year 1967
     :price 15
  }
  {
   :name "My Son, the Celebrity"
   :artist "Allan Sherman"
   :year 1963
   :price 15
  }
  {
    :name "Terrapin Station"
    :artist "Grateful Dead"
    :year 1977
    :price 19
  }
  {
    :name "Greatest Hits"
    :artist "Creed"
    :year 2004
    :price 23
  }
  {
   :name "Enema of the State"
    :artist "Blink-182"
    :year 1999
    :price 25
  }
  {
    :name "Islands"
    :artist "King Crimson"
    :year 1971
    :price 15
  }))

(defn recently-added-handler [request]
  (response (get-recently-added)))

(defn app [request]
  (case (:uri request)
    "/recently-added" (recently-added-handler request)
    (response {:error "Not found"})))

(defn -main []
  (run-jetty (-> app
                 json-middleware/wrap-json-response
                 (wrap-cors
                  :access-control-allow-origin [#"http://localhost:3000"]
                  :access-control-allow-methods [:get :post :put :delete]))
             {:port 3001}))
