Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  get "plans", to: "plans#index"
  get "profiles/check_username", to: "profiles#check_username"

  root to: proc { [200, { "Content-Type" => "text/plain" }, ["OK"]] }
end
