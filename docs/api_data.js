define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login in with user credentials to recieve a token to access other routes",
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
            "field": "Logged",
            "description": "<p>in bri</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Logged in bri\",\n  \"token\":\n  \"eyJhbGciOiJIUzI1NiIsInR5cCqwedI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2V\n  bmFtZSI6ImJyaSIsImlhdCI6MTU3ODE3NTM2MfsdfywiZXhwIjoxNTc4MTgyNTYzf\n  .43nHMQb0mGUQg42WyqeFgrEYqweJH2PNu-cYLg1tPN1Gw0\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Invalid",
            "description": "<p>Credentials invalid</p>"
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
    "url": "/register",
    "title": "Register User information",
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
            "field": "Thanks",
            "description": "<p>for joining the club!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "HTTP/1.1 201 Created\n{\n  \"message\": \"Thanks for joining the club!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/auth/router.js",
    "groupTitle": "Auth"
  }
] });
