from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


db=SQLAlchemy()
bcrypt = Bcrypt()

class Customer(db.Model, SerializerMixin):

    serialize_rules = ("-reviews.customer", "-products.customer",)

    __tablename__='customers'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)

    #relationship
    reviews = db.relationship('Review', backref='customers')
    products = db.relationship('Product', secondary='customer_products', back_populates='customers')

    def __repr__(self):
        return f'name {self.username}'
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("password hash cannot be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
        
class Product(db.Model, SerializerMixin):
    __tablename__='products'

    serialize_rules = ("-reviews.product", "customers.product",)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    in_stock = db.Column(db.Boolean)

    #relationship
    reviews = db.relationship('Review', backref='products')
    customers = db.relationship('Customer', secondary='customer_products', back_populates='products')

    def __repr__(self):
        return f'Product Name: {self.name} costs {self.price}'



class Review(db.Model, SerializerMixin):
    __tablename__='reviews'

    serialize_rules = ("-customer.reviews", "-product.reviews")
    
    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    #relationship
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))


    #relationship btwn customer and product
class CustomerProduct(db.Model, SerializerMixin):
    __tablename__='customer_products'

    id =db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
