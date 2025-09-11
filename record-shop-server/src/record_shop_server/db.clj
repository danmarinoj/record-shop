(ns record-shop-server.db
  (:require [clojure.java.jdbc :as jdbc]))

(def db-spec
  {:dbtype "postgresql"
   :dbname "your_db_name"
   :host "localhost"
   :port 5432
   :user "your_user"
   :password "your_password"})
