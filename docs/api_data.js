define({ "api": [
  {
    "type": "post",
    "url": "login",
    "title": "Login",
    "name": "Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Unique Username for the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Logged in <username></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Logged in bri\",\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCqwedI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VbmFtZSI6ImJyaSIsImlhdCI6MTU3ODE3NTM2MfsdfywiZXhwIjoxNTc4MTgyNTYzf.43nHMQb0mGUQg42WyqeFgrEYqweJH2PNu-cYLg1tPN1Gw0\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>invalid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"invalid\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/auth/router.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "register",
    "title": "Register",
    "name": "Register",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p><em>Required</em> Unique Username for the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p><em>Required</em> Password of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Unique Email of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of User.</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "is_chef",
            "description": "<p>Do not add, defaults to false</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Thanks for joining the club!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"message\": \"Thanks for joining the club!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/auth/router.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "register/chef",
    "title": "Register Chef",
    "name": "RegisterChef",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p><em>Required</em> Unique Username for the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p><em>Required</em> Password of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Unique Email of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of User.</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "is_chef",
            "description": "<p>Do not add, defaults to false</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p><em>Required</em> Location of Chef</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone_number",
            "description": "<p><em>Required</em> Phone Number of Chef</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "business_name",
            "description": "<p><em>Required</em> Company Name Chef is employeed at</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>What's your favourite dish?</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"message\": \"What's your favourite dish?\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/auth/router.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "chef/:chef_id/recipes",
    "title": "Add a Recipe",
    "name": "Add_a_Recipe",
    "group": "Chef_Recipes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p><em>Required</em> <strong>Unique</strong> title of recipe.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "servings",
            "description": "<p><em>Required</em> Number of people recipe serves.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instructions",
            "description": "<p><em>Required</em> How to make the recipe.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "images",
            "description": "<p>An image to attach to recipe.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 Created\n   {\n     \"chef\": {\n       \"chef_name\": \"Gordan Ramsy\",\n       \"business_name\": \"Lucky Cat\"\n     },\n     \"recipes\": [\n       {\n         \"recipe_id\": 4,\n         \"title\": \"Stuffed Pork Tenderloin Recipe\",\n         \"servings\": 4,\n         \"instructions\": \"Preheat the oven to 220°C/Gas 7...\"\n         \"images\": null\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/chef_recipes/router.js",
    "groupTitle": "Chef_Recipes"
  },
  {
    "type": "delete",
    "url": "chef/:chef_id/recipes/:recipe_id",
    "title": "Delete a Recipe",
    "name": "Delete",
    "group": "Chef_Recipes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>recipe was deleted</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: \"recipe was deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/chef_recipes/router.js",
    "groupTitle": "Chef_Recipes"
  },
  {
    "type": "get",
    "url": "chef/:chef_id/recipes",
    "title": "Get Chef's Recipe",
    "name": "Get_Recipes",
    "group": "Chef_Recipes",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 Created\n   {\n     \"chef\": {\n       \"chef_name\": \"Gordan Ramsy\",\n       \"business_name\": \"Lucky Cat\"\n     },\n     \"recipes\": [\n       {\n         \"chef_id\": 2,\n         \"recipe_id\": 4,\n         \"title\": \"Stuffed Pork Tenderloin Recipe\",\n         \"servings\": 4,\n         \"instructions\": \"Preheat the oven to 220°C/Gas 7...\"\n         \"images\": null\n       },\n       {\n         \"chef_id\": 2,\n         \"recipe_id\": 5,\n         \"title\": \"Gordon's Breakfast Pizza from Scrambled\",\n         \"servings\": 2,\n         \"instructions\": \"Remove the pizza dough ball from the fridge and let it warm to room temperature...\"\n         \"images\": null\n        }     \n]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/chef_recipes/router.js",
    "groupTitle": "Chef_Recipes"
  },
  {
    "type": "put",
    "url": "chef/:chef_id/recipes/:recipe_id",
    "title": "Update a Recipe",
    "name": "Update",
    "group": "Chef_Recipes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p><em>Required</em> <strong>Unique</strong> title of recipe.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "servings",
            "description": "<p><em>Required</em> Number of people recipe serves.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instructions",
            "description": "<p><em>Required</em> How to make the recipe.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 6,\n  \"title\": \"This was a tasty recipe!\",\n  \"servings\": 1,\n  \"instructions\": \"Nom nom nom\",\n  \"images\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/chef_recipes/router.js",
    "groupTitle": "Chef_Recipes"
  },
  {
    "type": "get",
    "url": "ingredients/quantities",
    "title": "Get All Avaliable Ingredients",
    "name": "Get_ingredients",
    "group": "Ingredients",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n      \"ingredients\": [\n          {\n              \"name\": \"almond milk\"\n          }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/ingredients/router.js",
    "groupTitle": "Ingredients"
  },
  {
    "type": "get",
    "url": "ingredients/quantities",
    "title": "Get All Avaliable Quantites",
    "name": "Get_quantites",
    "group": "Ingredients",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n   \"types\": [\n     {\n       \"id\": 1,\n       \"type_of_measurement\": \"weight\",\n       \"unit\": \"pound\",\n       \"abbreviation\": \"lb.\"\n     },\n     {\n       \"id\": 2,\n       \"type_of_measurement\": \"weight\",\n       \"unit\": \"ounce\",\n       \"abbreviation\": \"oz.\"\n     },\n     {\n       \"id\": 3,\n       \"type_of_measurement\": \"volume\",\n       \"unit\": \"gallon\",\n       \"abbreviation\": \"gal.\"\n     },\n     {\n       \"id\": 4,\n       \"type_of_measurement\": \"volume\",\n       \"unit\": \"quart\",\n       \"abbreviation\": \"qt.\"\n     },\n     {\n       \"id\": 5,\n       \"type_of_measurement\": \"volume\",\n       \"unit\": \"pint\",\n       \"abbreviation\": \"pt.\"\n     },\n     {\n       \"id\": 6,\n       \"type_of_measurement\": \"volume\",\n       \"unit\": \"cup\",\n       \"abbreviation\": \"c.\"\n     },\n     {\n       \"id\": 7,\n       \"type_of_measurement\": \"volume\",\n       \"unit\": \"fluid ounce\",\n       \"abbreviation\": \"fl. oz.\"\n     },\n     {\n       \"id\": 8,\n       \"type_of_measurement\": \"volume\",\n       \"unit\": \"tablespoon\",\n       \"abbreviation\": \"tbsp.\"\n     },\n     {\n       \"id\": 9,\n       \"type_of_measurement\": \"volume\",\n       \"unit\": \"teaspoon\",\n       \"abbreviation\": \"tsp\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/ingredients/router.js",
    "groupTitle": "Ingredients"
  }
] });
