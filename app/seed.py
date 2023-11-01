from random import randint, choice as rc, sample
from faker import Faker
from app import app
from models import db, Customer, Product, Review

fake = Faker()

with app.app_context():
    
    def clear_database():
        print("Clearing database...")
        Customer.query.delete()
        Product.query.delete()
        Review.query.delete()
        

    def seed_customer():
        print("seeding customers...")
        customers = []
        for i in range(5):
            username = fake.user_name()
            email = fake.unique.email()

            customer =Customer(username=username, email=email)
            customers.append(customer)

        db.session.add_all(customers)
        db.session.commit()

    def seed_products():
        print("seeding products...")
        products =[]
        for i in range(10):
            name = fake.name()
            image = fake.url()
            price = randint(2, 50)
            in_stock = rc([False, True])

            product = Product(name=name, image=image, price=price, in_stock=in_stock)

            products.append(product)

        db.session.add_all(products)
        db.session.commit()

    def seed_reviews():
        print("seeding reviews...")
        review_data = [
            {"review": "Great product!", "rating": 5},
            {"review": "Not bad, but could be better.", "rating": 3},
            {"review": "Terrible quality.", "rating": 1},
        ]

        products = Product.query.all()  
        customers = Customer.query.all()
        for product in products:
            for data in review_data:
                review = Review(
                    review=data["review"],
                    rating=data["rating"],
                    customer_id=rc(customers).id, 
                    product_id=product.id,
                )
                db.session.add(review)

        db.session.commit()

        print("Completed!")

    if __name__ == "__main__":
        clear_database()
        seed_customer()
        seed_products()
        seed_reviews()