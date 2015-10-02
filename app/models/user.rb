class User < ActiveRecord::Base
  has_secure_password


  validates_presence_of :password, on: :create
  validates :password, length: {in: 6..20}

  #validates :password, confirmation: true
  #<%= f.password_field :password%>
  #<%= f.password_field :password_confirmation%>
end
