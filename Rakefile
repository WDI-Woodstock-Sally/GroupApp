# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

# ***** GEMS *****
require 'bundler/setup'
Bundler.require

# ***** CONNECTION *****
ActiveRecord::Base.establish_connection(
  :adapter => 'postgresql',
  :database => 'Trivia-App_development'
)

# ***** MODELS *****
require './app/models/user'



namespace :db do

  desc "Create Admin User"
  task :create_user do
    user = User.new({username: 'admin', admin: true})
    user.password='Triviab4s3$'
    user.save!
  end

end # namespace :db
