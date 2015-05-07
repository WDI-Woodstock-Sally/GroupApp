<<<<<<< HEAD
class SuperSweetModelsController < ApplicationController
  def index
    @superSweetModels = SuperSweetModel.all
  end

  def show
    @superSweetModel = SuperSweetModel.find(params[:id])
  end
=======
  class SuperSweetModelsController < ApplicationController
    def index
      #charlie
    end

    def show
      #charlie
    end
>>>>>>> 84b07d5ad31e0bb74a9f0336a471823e62ef151d

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
<<<<<<< HEAD
    SuperSweetModel.destroy(params[:id])
=======
    #charlie
>>>>>>> c8ca0a920cb123c115ba7d7e7979f8827e3b6750
>>>>>>> 84b07d5ad31e0bb74a9f0336a471823e62ef151d
  end
