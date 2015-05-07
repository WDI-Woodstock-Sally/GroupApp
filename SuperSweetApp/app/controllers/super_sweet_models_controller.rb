  class SuperSweetModelsController < ApplicationController
    def index
      #charlie
    end

    def show
      #charlie
    end

    def new
      @supersweetmodel = SuperSweetModel.new
    end

    def create
      @supersweetmodel = SuperSweetModel.create(supersweetmodel_params)
      redirect_to '/supersweetmodels/#{supersweetmodels.id}'
    end

    def edit
      #nick
    end
    def update
      #nick
    end

    def destroy
      #charlie
    end
  end
