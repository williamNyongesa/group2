from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


db=SQLAlchemy()

class Customer(db.Model, SerializerMixin):
    __tablename__='customers'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String)

    def __repr__(self):
        return f'name {self.username}'
    

class Product(db.Model, SerializerMixin):
    __tablename__='products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    in_stock = db.Column(db.Boolean)
    

    def __repr__(self):
        return f'Product Name: {self.name} costs {self.price}'
