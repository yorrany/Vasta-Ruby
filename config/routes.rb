Rails.application.routes.draw do
  if ENV["VASTA_INTERNO"] == "true"
    namespace :governanca do
      get "ux", to: "ux#index"
    end
  end

  # rotas existentes
  get "up" => "rails/health#show", as: :rails_health_check
  get "plans", to: "plans#index"
  get "profiles/check_username", to: "profiles#check_username"

  root to: ->(_) { [200, {}, ["OK"]] }
end


Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  get "plans", to: "plans#index"
  get "profiles/check_username", to: "profiles#check_username"

  root to: proc { [200, { "Content-Type" => "text/plain" }, ["OK"]] }
end
