from flask import Flask,request,session, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from werkzeug.exceptions import NotFound
import os
from models import db, Customer, Product, Review

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
# app.secret_key = os.getenv("MY_KEY")
app.secret_key ="b'\xd4\xfa\x1d\x0e\x02\x87\x91\x96V\xb5H{\xd3\xd5\x1ee'"

# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app, origins="*")

# @app.before_request
# def check_if_logged_in():
#     if "customer_id" not in session:
#         if request.endpoint not in ["signup","login", "products"]:
#             return {"error": "unauthorized access!"}, 401
        
class CheckSession(Resource):
    def get(self):
        if session.get('customer_id'):
            customer = Customer.query.filter(Customer.id==session['customer_id']).first()

            customer_dict = {
                "username": customer.username,
                "password": customer._password_hash
            }
            return customer_dict, 200
        
        return {'error': 'Resource unavailable'}

class Index(Resource):
    def get(self):
        response_body = "Welcome to E-shop Product Feedback Rest API!"
        status= 200
        headers = {}

        return (response_body, status, headers)
    

class Signup(Resource):
    def post(self):
        username = request.get_json().get("username")
        email = request.get_json().get("email")
        password = request.get_json().get("password")

        if username and email and password:
            new_customer = Customer(username=username, email=email)
            new_customer.password_hash = password

            db.session.add(new_customer)
            db.session.commit()

            session["customer_id"] = new_customer.id
            return new_customer.to_dict(), 201

        return {"error": "Customer details must be provided!"}, 422
    
class Login(Resource):

    def post(self):
        username = request.get_json().get("username")
        password = request.get_json().get("password")

        customer = Customer.query.filter(Customer.username==username).first()

        if customer and customer.authenticate(password):
            session['customer_id'] = customer.id
            
            customer_dict = customer.to_dict()

            return make_response(jsonify(customer_dict), 201)
        else:
            return {"error": "invalid username or password"}, 401
        
class Logout(Resource):
    def delete(self):
        if session.get('customer_id'):
            session['customer_id'] = None
            return {'info': 'customer logged out successfully'}, 200
        else:
            return {'error': 'not logged in!'}, 401
        

class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()

        # reviews_list = [review.to_dict() for review in reviews]

        # return make_response(jsonify(reviews_list), 200)

    

        reviews_list = []
        for review in reviews:
            review_dict = {
                "rating": review.rating,
                "review": review.review,
                "customer_id": review.customer_id,
                "product_id": review.product_id
            }
            reviews_list.append(review_dict)

        response = make_response(jsonify(reviews_list), 200)
        return response
    
    def post(self):
        customer_id = session.get("customer_id")
        product_id = request.get_json().get("product_id")
        review_text = request.get_json().get("review")
        rating = request.get_json().get("rating")

        if customer_id is None:
            return {"error": "You must be logged in to create a review"}, 401
        
        if product_id is None or review_text is None or rating is None:
            return {"error":"Product ID, review and rating must be provided to create a review"}, 422
        
        #Check if the customer has already reviewed this product
        existing_review = Review.query.filter_by(customer_id = customer_id, product_id=product_id).first()

        if existing_review:
            return {"error": "You have already reviewed this product!"}, 422
        
        new_review = Review(
            review=review_text,
            rating=rating,
            customer_id=customer_id,
            product_id=product_id
        )
        db.session.add(new_review)
        db.session.commit()

        new_review_dict = {
            "review": new_review.review,
            "rating": new_review.rating,
            "customer_id": new_review.customer_id,
            "product_id": new_review.product_id
        }

        response = make_response(jsonify(new_review_dict), 201)
        
        return response
        
class ReviewByID(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()

        if review:
            review_dict = {
                "review": review.review,
                "rating": review.rating,
                "customer_id": review. customer_id,
                "product_id": review.product_id
            }
            
            response = make_response(jsonify(review_dict), 200)

        else:
            response = {"error": "resource not found"}, 404
        
        return response

    def patch(self,id):
        review = Review.query.filter_by(id=id).first()


        #using form data
        if review:
            for attr in request.form:
                setattr(review, attr, request.form[attr])

                db.session.add(review)
                db.session.commit()

                review_dict = {
                    "review": review.review,
                    "rating": review.rating,
                    "customer_id": review.customer_id,
                    "product_id": review.product_id
                }
                
                response = make_response(
                    jsonify(review_dict),
                    200
                )
        else:
            response = {"error": "review not found"}, 404
        
        return response

        #using raw json data
    #   for attr in request.get_json():
    #         setattr(review,attr,request.get_json()[attr])
    #         db.session.add(review)
    #         db.session.commit()
    #         review_to_dict = review.to_dict()
    #         response = make_response(jsonify(review_to_dict),200)
    #         response.content_type = "application/json"
    #         return response
    

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()

        if review:
            db.session.delete(review)
            db.session.commit()

            response = make_response(jsonify({}), 200)
        else:
           response = {"error": "review not found"}, 404

        return response
    
class Products(Resource):
    def get(self):
        products = Product.query.all()

        product_list = []
        for product in products:
            product_dict = {
                "name": product.name,
                "image": product.image,
                "price": product. price,
                "in_stock":product.in_stock
            }
            product_list.append(product_dict)

        return make_response(jsonify(product_list), 200)
    

class Customers(Resource):
    def get(self):
        customers = Customer.query.all()

        customer_list = []
        for customer in customers:
            customer_dict = {
                "username": customer.username,
                "email": customer.email,
                
            }
            customer_list.append(customer_dict)

        return make_response(jsonify(customer_list), 200)
    

api.add_resource(Index, "/")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(Reviews, "/reviews", endpoint="reviews")
api.add_resource(ReviewByID, "/reviews/<int:id>", endpoint= "/reviews/<int:id>")
api.add_resource(Products, "/products", endpoint="products")
api.add_resource(Customers, "/customers", endpoint="customers")

@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(jsonify({"error":"Resource not found in the server"}), 404)

    return response

if __name__ == "__main__":
    app.run(port=5555, debug=True)
