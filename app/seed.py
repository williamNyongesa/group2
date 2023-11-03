from random import randint, choice as rc
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
        products_data = [

        {"name": "Throw Pillows", "image_link": "https://images.pexels.com/photos/4112598/pexels-photo-4112598.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Wall Art", "image_link": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Area Rugs", "image_link": "https://images.pexels.com/photos/18057891/pexels-photo-18057891/free-photo-of-young-woman-sitting-on-the-ground-with-rugs-with-traditional-oriental-patterns.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Candles", "image_link": "https://images.pexels.com/photos/4207782/pexels-photo-4207782.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Vases", "image_link": "https://images.pexels.com/photos/7354630/pexels-photo-7354630.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Picture Frames", "image_link": "https://images.pexels.com/photos/3230516/pexels-photo-3230516.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Table Lamps", "image_link": "https://images.pexels.com/photos/6431888/pexels-photo-6431888.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Mirrors", "image_link": "https://images.pexels.com/photos/1528975/pexels-photo-1528975.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Curtains", "image_link": "https://images.pexels.com/photos/5835536/pexels-photo-5835536.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Decorative Throw Blankets", "image_link": "https://images.pexels.com/photos/9872356/pexels-photo-9872356.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Cozy Throw Blanket", "image_link": "https://images.pexels.com/photos/6632980/pexels-photo-6632980.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Vintage Wall Clock", "image_link": "https://images.pexels.com/photos/177154/pexels-photo-177154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
        {"name": "Scented Candles Set", "image_link": "https://images.pexels.com/photos/5854427/pexels-photo-5854427.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Rustic Wooden Shelves", "image_link": "https://images.pexels.com/photos/5824523/pexels-photo-5824523.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        { "name": "Floral Patterned Rug", "image_link": "https://images.pexels.com/photos/10782816/pexels-photo-10782816.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Artificial Potted Plant", "image_link": "https://images.pexels.com/photos/6373537/pexels-photo-6373537.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Decorative Throw Pillows", "image_link": "https://images.pexels.com/photos/1362385/pexels-photo-1362385.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Antique Brass Table Lamp", "image_link": "https://images.pexels.com/photos/10936672/pexels-photo-10936672.jpeg?auto=compress&cs=tinysrgb&w=1600"},
        {"name": "Framed Wall Art Prints", "image_link": "https://images.pexels.com/photos/11059905/pexels-photo-11059905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
        {"name": "Mirrored Console Table", "image_link": "https://images.pexels.com/photos/4959833/pexels-photo-4959833.jpeg?auto=compress&cs=tinysrgb&w=1600"}
    ]

        products =[]
        for i in range(24):
            product_data = rc(products_data)
            name = product_data["name"]
            image = product_data["image_link"]
            price = randint(2, 50)
            in_stock = rc([False, True])

            product = Product(name=name, image=image, price=price, in_stock=in_stock)

            products.append(product)

        db.session.add_all(products)
        db.session.commit()

    def seed_reviews():
        print("seeding reviews...")
        review_data = [
            {"review": "Outstanding quality and performance!", "rating": 5},
            {"review": "A decent product, does the job well.", "rating": 4},
            {"review": "Average at best, not worth the price.", "rating": 2},
            {"review": "Exceptional value for money, highly recommended.", "rating": 5},
            {"review": "Needs improvement in durability, but it's functional.", "rating": 3},
            {"review": "Simply fantastic! Exceeded my expectations.", "rating": 5},
            {"review": "Not very user-friendly, but it gets the job done.", "rating": 3},
            {"review": "Waste of money, do not buy.", "rating": 1},
            {"review": "Good product, but could use some enhancements.", "rating": 4},
            {"review": "I can't believe how awful this is. Avoid at all costs.", "rating": 1}
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


    if __name__ == "__main__":
        clear_database()
        seed_customer()
        seed_products()
        seed_reviews()
        
