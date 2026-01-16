module Governanca
  class UxController < ApplicationController
    before_action :ensure_internal_access!

    def index
      # Aqui você vai renderizar a tela privada
      # ou servir o frontend (HTML/JSON)
          render "governanca/ux/index"

        end

    private

    def ensure_internal_access!
      return if ENV["VASTA_INTERNO"] == "true"

      head :not_found
    end
  end
end

