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

<<<<<<< HEAD
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
=======
  def edit
    supersweetmodel = SuperSweetModel.find(params[:id]) #nick
  end
  # def update
  #   supersweetmodel = SuperSweetModel.find(params[:id]) #nick
  #   supersweetmodel.update(supersweetmodel_params)
  #   redirect_to "/supersweetmodel/#{supersweetmodel.id}"
  # end
  
  def destroy
    #charlie
>>>>>>> c8ca0a920cb123c115ba7d7e7979f8827e3b6750
  end
