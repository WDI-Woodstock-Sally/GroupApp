class SuperSweetModelsController < ApplicationController
  def index
    @superSweetModels = SuperSweetModel.all
  end

  def show
    @superSweetModel = SuperSweetModel.find(params[:id])
  end

    def new
      @supersweetmodel = SuperSweetModel.new
    end

    def create
      @supersweetmodel = SuperSweetModel.create(supersweetmodel_params)
      redirect_to '/supersweetmodels/#{supersweetmodels.id}'
    end

    def update
      #nick
    end

  def edit
    @supersweetmodel = SuperSweetModel.find(params[:id]) #nick
  end
  # def update
  #   supersweetmodel = SuperSweetModel.find(params[:id]) #nick
  #   supersweetmodel.update(supersweetmodel_params)
  #   redirect_to "/supersweetmodel/#{supersweetmodel.id}"
  # end

  def destroy
    SuperSweetModel.destroy(params[:id])
  end

end
