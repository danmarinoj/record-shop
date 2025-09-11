(ns record-shop-server.core
  ;; (:gen-class)
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [ring.util.response :refer [response]]
            [record-shop-server.db :refer [db-spec]]
            [clojure.java.jdbc :as jdbc]))

(defn get-users []
  (jdbc/query db-spec ["SELECT * FROM users"]))

(defn users-handler [request]
  (response (get-users)))

(defn app [request]
  (case (:uri request)
    "/users" (users-handler request)
    (response {:error "Not found"})))

(defn -main []
  (run-jetty app {:port 3000}))
