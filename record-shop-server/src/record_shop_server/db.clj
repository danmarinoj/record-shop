(ns record-shop-server.db
  (:require [clojure.java.jdbc :as jdbc]))

(def db-spec
  {:dbtype "postgresql"
   :dbname "shop"
   :host "localhost"
   :port 5432
   :user "dd_user"
   :password (System/getenv "DD_USER_PASSWORD")})
