from flask import Flask,request,session, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, Customer, Product, CustomerProduct, Review

app = Flask(__name__)
app.secret_key = "aicila@2016"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app, origins="*")

class Index(Resource):
    def get(self):
        response_body = "Welcome to E-shop Product Feedback Page!"
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
            
            return customer.to_dict(), 201
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
        review_list = []
        for review in reviews:
            review_dict = {
                "rating":review.rating, 
                "review":review.review
            }
            review_list.append(review_dict)
            response = make_response(jsonify(review_list), 200)
        return response

    def post(self):
        new_item = Review(
            review = request.get_json()["review"],
            rating = request.get_json()["rating"]
        
        )
        db.session.add(new_item)
        db.session.commit()
        # response_body = (f"{new_item.to_dict} is posted successfully")
        response_dict = new_item.to_dict
        response = make_response(jsonify(response_dict), 201)
        return response




api.add_resource(Index, "/")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(Reviews, "/reviews", endpoint= "reviews")
# api.add_resource(Reviews, "/ratings", endpoint= "reviews")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
