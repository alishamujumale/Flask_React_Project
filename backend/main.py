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


if __name__ == "__main__":
    app.run(debug=True)
