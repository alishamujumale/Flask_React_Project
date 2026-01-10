from flask.cli import FlaskGroup
from main import app, db  # Import your app and db from main.py

cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()
