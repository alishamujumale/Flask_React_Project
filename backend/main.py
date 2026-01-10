from flask import Flask, request,jsonify
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash,check_password_hash

from config import DevConfig
from models import Recipe, User
from exts import db
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required

app = Flask(__name__)
CORS(app)
app.config.from_object(DevConfig)

db.init_app(app)
migrate = Migrate(app, db)
JWTManager(app)

api = Api(app, doc='/docs')

# Namespaces
auth_ns = api.namespace('auth', description='Authentication APIs')
recipe_ns = api.namespace('recipes', description='Recipe APIs')

# Models
recipe_model = recipe_ns.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)

signup_model = auth_ns.model(
    "SignUp",
    {
        "username": fields.String(required=True),
        "email": fields.String(required=True),
        "password": fields.String(required=True)
    }
)

login_model=auth_ns.model(
    "Login",
    {
    "username":fields.String(),
    "email":fields.String(),
    "password":fields.String()
    }
)

# ---------------- AUTH ----------------

@auth_ns.route('/hello')
class Hello(Resource):
    def get(self):
        return {"message": "Hello World"}


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
          

          

# ---------------- RECIPES ----------------

@recipe_ns.route('/')
class Recipes(Resource):

    @recipe_ns.marshal_list_with(recipe_model)
    def get(self):
        return Recipe.query.all()

    @recipe_ns.expect(recipe_model)
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def post(self):
        data = request.get_json()

        recipe = Recipe(
            title=data.get("title"),
            description=data.get("description")
        )

        db.session.add(recipe)
        db.session.commit()

        return recipe, 201


@recipe_ns.route('/<int:id>')
class RecipeById(Resource):

    @recipe_ns.marshal_with(recipe_model)
    def get(self, id):
        return Recipe.query.get_or_404(id)

    @recipe_ns.expect(recipe_model)
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def put(self, id):
        recipe = Recipe.query.get_or_404(id)
        data = request.get_json()

        recipe.title = data.get("title")
        recipe.description = data.get("description")

        db.session.commit()
        return recipe
    @jwt_required()
    def delete(self, id):
        recipe = Recipe.query.get_or_404(id)
        db.session.delete(recipe)
        db.session.commit()
        return {"message": "Recipe deleted"}


if __name__ == "__main__":
    app.run(debug=True)
