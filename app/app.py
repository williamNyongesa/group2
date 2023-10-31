from flask import Flask,request,session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, Customer, Product, CustomerProduct, Review

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app, origins="*")

class Index(Resource):
    def get(self):
        response_body = "Welcome Home!"
        status= 200
        headers = {}

        return (response_body, status, headers)
    

class Signup(Resource):
    def post(self):
        username = request.get_json("username")
        email = request.get_json("email")
        password = request.get_json("password")

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
        username = request.get_json("username")
        password = request.get_json("password")

        customer = Customer.query.filter(Customer.username==username).first()

        if customer and customer.authenticate(password):
            session['customer_id'] = customer.id
            
            return customer.to_dict(), 200
        else:
            return {"error": "invalid username or password"}, 401

api.add_resource(Index, "/")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
