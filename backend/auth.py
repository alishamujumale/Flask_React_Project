
from flask import Flask, request,jsonify
from flask_restx import Api, Resource, fields,Namespace
from werkzeug.security import generate_password_hash,check_password_hash
from models import User
from exts import db
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required

auth_ns=Namespace('auth',description="A namespace for our authentication")

signup_model = auth_ns.model(
    "SignUp",
    {
        "username": fields.String(required=True),
        "email": fields.String(required=True),
        "password": fields.String(required=True)
    }
)

@auth_ns.route('/hello')
class Hello(Resource):
    def get(self):
        return {"message": "Hello World"}  


login_model=auth_ns.model(
    "Login",
    {
    "username":fields.String(),
    "email":fields.String(),
    "password":fields.String()
    }
)

@auth_ns.route('/signup')
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()

        username = data.get("username")

        db_user = User.query.filter_by(username=username).first()
        if db_user:
            return {"message": f"User with username {username} already exists"}, 400

        new_user = User(
            username=username,
            email=data.get("email"),
            password=generate_password_hash(data.get("password"))
        )

        db.session.add(new_user)
        db.session.commit()

        return {"message": "User created successfully"}, 201


@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data=request.get_json()

        username=data.get('username')
        password=data.get('password')
        db_user=User.query.filter_by(username=username).first()
        if db_user and check_password_hash(db_user.password, password):
            access_token=create_access_token(identity=db_user.username)
            refresh_token=create_refresh_token(identity=db_user.username)

            return jsonify(
                {"access_token":access_token,"refresh_token":refresh_token}
            )