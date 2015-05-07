class CreateSuperSweetModels < ActiveRecord::Migration
  def change
    create_table :super_sweet_models do |t|
      t.string :name
      t.string :ability

      t.timestamps null: false
    end
  end
end
