import random
import string
from gatco.response import json, text
from application.server import app
from application.database import db
from application.extensions import auth

from application.models.model import User, GioHang 

async def create_cart_for_user(user_id):
    user_cart = db.session.query(GioHang).filter(GioHang.khach_hang_id == user_id).first()
    if user_cart is None:
        # Tạo mới giỏ hàng của user
        new_user_cart = GioHang()
        new_user_cart.khach_hang_id = user_id
        new_user_cart.tongtien = 0 
        db.session.add(new_user_cart)
        db.session.commit()
        return new_user_cart.id 
    return user_cart.id
@app.route("/user_test")
async def user_test(request):
    return text("user_test api")

@app.route("/user/login", methods=["POST", "GET"])
async def user_login(request):
    param = request.json
    user_name = param.get("user_name")
    password = param.get("password")
    print(user_name, password)
    if (user_name is not None) and (password is not None):
        user = db.session.query(User).filter(User.user_name == user_name).first()
        if (user is not None) and auth.verify_password(password, user.password, user.salt):
            auth.login_user(request, user)
            user_cart = await create_cart_for_user(user_id=user.id)
            return json({"id": user.id, "user_name": user.user_name, "full_name": user.full_name, "user_cart_id":user_cart})
        return json({"error_code":"LOGIN_FAILED","error_message":"user does not exist or incorrect password"}, status=520)

    else:
        return json({"error_code": "PARAM_ERROR", "error_message": "param error"}, status=520)
    return text("user_login api")

@app.route("/user/logout", methods=["GET"])
async def user_logout(request):
    auth.logout_user(request)
    return json({})

@app.route("/user/current_user", methods=["GET"])
async def user_current_user(request):
    user_id = auth.current_user(request)
    print(user_id)

    user = User.query.filter(User.id == user_id).first()
    if user is not None:
        print(user.full_name)
        return json({"id": user.id, "user_name": user.user_name, "full_name": user.full_name})
    else:
        return json({"error_code": "NOT_FOUND", "error_message": "User not found"}, status=520)
    return json({"error_code": "UNKNOWN", "error_message": "Unknown error"}, status=520)

@app.route("/user/register", methods=["POST"])
async def user_register(request):
    data = request.json
    user_name = data.get("user_name",None)
    password = data.get('password',None)
    full_name = data.get("full_name",None)
    email = data.get("email",None)

    if user_name is None or password is None:
        return json({"error_code": "DATA ERROR", "error_message": "DATA ERROR"}, status=520)
    user = User.query.filter(User.user_name == user_name).first()
    if user is None:
        # create salt
        letters = string.ascii_lowercase
        user_salt = ''.join(random.choice(letters) for i in range(64))
        print("user_salt", user_salt)
        # create user password
        user_password=auth.encrypt_password(password, user_salt)

        #create user
        user = User(user_name=user_name, full_name=full_name, email=email,\
            password=user_password, salt=user_salt)
        
        db.session.add(user)
 
    db.session.commit()
    return json({},200)

