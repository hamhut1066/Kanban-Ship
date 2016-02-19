(ns kanban.config
  (:require [clojure.tools.logging :as log]))

(def defaults
  {:init
   (fn []
     (log/info "\n-=[kanban started successfully]=-"))
   :middleware identity})
