# [Chef Portfolio Backend](https://chef-portfolio-be.herokuapp.com/)

Hosted at: https://chef-portfolio-be.herokuapp.com/

## Sanity Check

method url: **/**

http method: **[GET]**

**Example Response:** 
        status 200 (OK)

        ```
        {
          "The server is up and running! <3 😊"  
        }
        ```

## REGISTER AND LOGIN ENDPOINTS

### NO AUTHENTICATION REQUIRED

### Registering a user
method url: **/register**

http method: **[POST]**

**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| username | String | Yes      | Must be unique                    |
| password | String | Yes      |                                   |
| email    | String | No       | Must be unique                    |
| name     | String | No       |                                   |
| is_chef  | bool   | No       | Defaults to false                 |

**Example Body:**
```
{
  username: 'lambda',
  password: 'school!',
  email: 'lambdaschool@gmail.com',
  name: 'Chris',
  is_chef: false
}
```

**Example Response:** status 201 (Created)

--------------------

### Logging in a user
method url: **/login**

http method: **[POST]**

**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| username | String | Yes      | Must be unique                    |
| password | String | Yes      |                                   |

**Example Body:**
```
{
  username: 'lambda',
  password: 'school!'
}
```

**Example Response:** status 200 (OK)
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhbWJkYSIsImlhdCI6MTU2OTM3Mzg5OSwiZXhwIjoxNTY5NDYwMjk5fQ.QWqe4i1fZJmHikIP07avAjTzRc3QhefnFkbcFp6ZM90" 
}
```
**Example Response:** status 401 (Unauthorized)
```
{
  "message": "Invalid credentials"
}
```