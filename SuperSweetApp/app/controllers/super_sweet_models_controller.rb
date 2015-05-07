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
      supersweetmodel = SuperSweetModel.create(supersweetmodel_params)
      redirect_to "/super_sweet_models/#{supersweetmodel.id}"
    end

    def edit
      @supersweetmodel = SuperSweetModel.find(params[:id]) #nick
    end
    def update
      supersweetmodel = SuperSweetModel.find(params[:id]) #nick
      supersweetmodel.update(supersweetmodel_params)
      redirect_to "/super_sweet_models/#{supersweetmodel.id}"
    end

    def destroy
      SuperSweetModel.destroy(params[:id])
    end

    private
    
    def supersweetmodel_params
      params.require(:super_sweet_model).permit(:name, :ability)
    end
     

end
