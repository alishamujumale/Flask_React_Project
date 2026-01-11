from flask import Flask, request,jsonify
from flask_restx import Resource, fields,Namespace
from models import Recipe
from exts import db
from flask_jwt_extended import jwt_required


auth_ns=Namespace('auth',description="A namespace for our authentication")
recipe_ns=Namespace('recipe',description="A namespace for recipes")

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
