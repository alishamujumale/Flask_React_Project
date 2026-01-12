from flask import request, abort
from flask_restx import Resource, fields, Namespace
from flask_jwt_extended import jwt_required
from models import Recipe
from exts import db

# ---------------- NAMESPACES ----------------

auth_ns = Namespace('auth', description="Authentication APIs")
recipe_ns = Namespace('recipe', description="Recipe APIs")

# ---------------- MODELS ----------------

recipe_model = recipe_ns.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(required=True),
        "description": fields.String(required=True),
    }
)

# ---------------- AUTH ----------------

@auth_ns.route('/hello')
class Hello(Resource):
    def get(self):
        return {"message": "Hello World"}


# ---------------- RECIPES ----------------

@recipe_ns.route('/recipes')
class Recipes(Resource):

    @recipe_ns.marshal_list_with(recipe_model)
    def get(self):
        """Get all recipes"""
        return Recipe.query.all()

    @recipe_ns.expect(recipe_model)
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def post(self):
        """Create a recipe"""
        data = request.get_json()

        recipe = Recipe(
            title=data.get("title"),
            description=data.get("description")
        )

        db.session.add(recipe)
        db.session.commit()

        return recipe, 201


@recipe_ns.route('/recipes/<int:id>')
class RecipeById(Resource):

    @recipe_ns.marshal_with(recipe_model)
    def get(self, id):
        """Get recipe by ID"""
        recipe = db.session.get(Recipe, id)
        if not recipe:
            abort(404)
        return recipe

    @recipe_ns.expect(recipe_model)
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def put(self, id):
        """Update recipe"""
        recipe = db.session.get(Recipe, id)
        if not recipe:
            abort(404)

        data = request.get_json()
        recipe.title = data.get("title")
        recipe.description = data.get("description")

        db.session.commit()
        return recipe

    @jwt_required()
    def delete(self, id):
        """Delete recipe"""
        recipe = db.session.get(Recipe, id)
        if not recipe:
            abort(404)

        db.session.delete(recipe)
        db.session.commit()
        return {"message": "Recipe deleted"}
