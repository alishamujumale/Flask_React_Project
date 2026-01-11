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



# ---------------- AUTH ----------------

@auth_ns.route('/hello')
class Hello(Resource):
    def get(self):
        return {"message": "Hello World"}  

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
