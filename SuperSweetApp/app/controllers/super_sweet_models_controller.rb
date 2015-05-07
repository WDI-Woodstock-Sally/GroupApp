class SuperSweetModelsController < ApplicationController
  def index
    @superSweetModels = SuperSweetModel.all
  end

  def show
    @superSweetModel = SuperSweetModel.find(params[:id])
  end

  def new
    #dakoda
  end
  def create
    #dakoda
  end

  def edit
    #nick
  end
  def update
    #nick
  end

  def destroy
    SuperSweetModel.destroy(params[:id])
  end
end
