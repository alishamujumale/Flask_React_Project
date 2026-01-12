import unittest
import json 
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()

    def test_signup(self):
        signup_response=self.client.post( '/auth/signup',
            json={"username":"testuser",
                  "email":"testuser@test.com",
                  "password":"password"}
        )
        status_code=signup_response.status_code
        self.assertEqual(status_code,201)

    def test_login(self):
        signup_response=self.client.post( '/auth/signup',
            json={"username":"testuser",
                  "email":"testuser@test.com",
                  "password":"password"}
        )

        login_response=self.client.post('/auth/login',
            json={"username":"testuser",
                  "email":"testuser@test.com",
                  "password":"password"}
        )

        status_code=login_response.status_code

        self.assertEqual(status_code,200)

        json=login_response.json
        #print(json)

    def test_get_all_recipes(self):
        """TEST GETTING ALL RECIPES"""
        response=self.client.get('/recipe/recipes')
        #print(response.json)

        status_code=response.status_code
        self.assertEqual(status_code,200)
        
    def test_get_one_recipe(self):
        id=1
        response=self.client.get(f'/recipe/recipes/{id}')
        status_code=response.status_code
        self.assertEqual(status_code,404)
        print(status_code)

    def test_create_recipe(self):
        signup_response=self.client.post( '/auth/signup',
            json={"username":"testuser",
                  "email":"testuser@test.com",
                  "password":"password"}
        )

        login_response=self.client.post('/auth/login',
            json={"username":"testuser",
                  "email":"testuser@test.com",
                  "password":"password"}
        )

        access_token=login_response.json["access_token"]

        create_recipe_response=self.client.post( '/recipe/recipes',
            json={"title":"Test Cookie",
                  "description":"Test description"
                  },
            headers={
                    "Authorization":f"Bearer {access_token}"
                  }
        )
        status_code=create_recipe_response.status_code

        self.assertEqual(status_code,201)

        
    def test_update_recipe(self):
        signup_response=self.client.post( '/auth/signup',
            json={"username":"testuser",
                  "email":"testuser@test.com",
                  "password":"password"}
        )

        login_response=self.client.post('/auth/login',
            json={"username":"testuser",
                  "email":"testuser@test.com",
                  "password":"password"}
        )
        access_token=login_response.json["access_token"]

        create_recipe_response=self.client.post( '/recipe/recipes',
            json={"title":"Test Cookie",
                  "description":"Test description"
                  },
            headers={
                    "Authorization":f"Bearer {access_token}"
                  }
        )

        id=1
        #get_one=self.client.get(f'/recipe/recipes/{id}')
        update_response=self.client.put( f'/recipe/recipes/{id}',
            json={
                "title":"Test Cookie",
                "description":"Test description"},
            headers={"Authorization":f"Bearer {access_token}"}
        )
        print(update_response.json)
        self.assertEqual(update_response.status_code, 200)



    def test_delete_recipe(self):
        signup_response=self.client.post( '/auth/signup',
            json={"username":"testuser",
                  "email":"testuser@test.com",
                  "password":"password"}
        )

        login_response=self.client.post('/auth/login',
            json={"username":"testuser",
                  "email":"testuser@test.com",
                  "password":"password"}
        )
        access_token=login_response.json["access_token"]

        create_recipe_response=self.client.post( '/recipe/recipes',
            json={"title":"Test Cookie",
                  "description":"Test description"
                  },
            headers={
                    "Authorization":f"Bearer {access_token}"
                  }
        )

        id=1
        #get_one=self.client.get(f'/recipe/recipes/{id}')
        update_response=self.client.put( f'/recipe/recipes/{id}',
            json={
                "title":"Test Cookie",
                "description":"Test description"},
            headers={"Authorization":f"Bearer {access_token}"}
        )
        id=1
        delete_response=self.client.delete(
            f'/recipe/recipes/{id}',
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        status_code=delete_response.status_code
        print(delete_response.json)
        self.assertEqual(status_code,200)


    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.engine.dispose()
            db.drop_all()

    def test_hello_world(self):
        response = self.client.get('/auth/hello')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()

        self.assertEqual(data, {"message": "Hello World"})
        print(json)

if __name__ == '__main__':
    unittest.main()
