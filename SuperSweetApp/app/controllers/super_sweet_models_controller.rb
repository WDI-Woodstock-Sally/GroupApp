class SuperSweetModelsController < ApplicationController
  def index
    #charlie
  end

  def show
    #charlie
  end

  def new
    #dakoda
  end
  def create
    #dakoda
  end

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
  end
end
