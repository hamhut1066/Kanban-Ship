(ns kanban.routes.home
  (:require [kanban.layout :as layout]
            [compojure.core :refer [defroutes GET PATCH]]
            [ring.util.http-response :as response]
            [ship]
            [config.core]
            [clojure.core :use [slurp]]
            [clojure.java.io :as io]))

;; move to util function
(def token (config.core/env :token))

(defn home-page []
  (layout/render
    "index.html"))

(defn about-page []
  (layout/render "about.html"))

;; look into caching potentially...
(defn all-unresolved []
  {:status 200
   :headers {"Content-Type" "application/json"}
   :body (ship/problems token {:predicate "state.resolved = NO" :includeDetail true})})
   ;; :body (ship/problems token {:predicate "state.resolved = NO" :includeDetail true})})

;; add error checking here...
;; (defn set-key [identifier key value]
;;   {:status 200
;;    :headers {"Content-Type" "application/json"}
;;    :body (ship/problem_keyword_set token identifier key value)})

(defn set-key
  "Sets the key for all of the things"
  [identifier key value]
  (try
    (let [return (ship/problem_keyword_set token identifier key value)]
      {:status (if (= "" (get return :body)) 404 404)
       :headers {"Content-Type" "application/json"}
       :body return})))

(defn this-test [request]
  {:status 200
   :body request})

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/problems/open" [] (all-unresolved))
  (GET "/place/:id" [id] (this-test id))
  (PATCH "/problems/:id/move/:column" [id column] (set-key id "column" column)))

