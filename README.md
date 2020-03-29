# node-api-pagamentos

**Installation**
- clone this repository
- create a database on your machine that matches the development in ./config/config-example.json 
- create and update the config.json file's development object with your own local MYSQL database settings.
- run ```npm install``` 
- run ```npx sequelize-cli db:migrate``` 
- run ```npm start```


The domain for the endpoints call is: http://localhost:8000

The authentication will be made through a Token hash generated when the user login, I use the bcrypt library to hash the token. 
It will be saved on the Sessions table and will be deleted when the user logout. It is necessary to have the user token to access
the API endpoints.


##**endpoints da API**

####````  {{url}}/createUserr -> ````  

POST Cadastro - This route is used to create a new user, the user data must be informed and in result the route will
return the new user. 

HEADERS
Content-Type    application/json

BODY    json

Request:

    {
        "name": "Carol",
        "email": "caroline@gmail.com",
        "password": "carolzinha10",
        "document": "15871239757",
        "phoneNumber": "981461990",
        "isAdmin": 1, (Admin - 1, user - 0)
        "address": "rua garnier", (optional)
        "description": "descrição de mim" (optional)
    }   
    
name - String
email - String/unique
password - String
document - String/unique
phoneNumber - String
isAdmin - INTEGER
address - String
description - String

Response:

    {
        "id": 1,
        "name": "Carol",
        "email": "caroline@gmail.com",
        "password": "$2b$10$HlYHWaRttu54vFP2ITmkBeVvkPtxPfVV6eTPsek5GZqAvw5g/geRS",
        "phoneNumber": "981461990",
        "document": "15871239757",
        "isAdmin": 1,
        "address": "rua garnier",
        "description": "descrição de mim",
        "updatedAt": "2020-03-29T01:41:04.827Z",
        "createdAt": "2020-03-29T01:41:04.827Z"
    }


####````{{url}}/login ->````

POST login - It must be informed on the request body the user email and password and will return the token of the session.
It is necessary add the token on every Authenticated route header. The token will expires when the user logout or when a new
user login. 

HEADERS
Content-Type    application/json

BODY    json
Request:

    {
        "email": "caroline@gmail.com",
        "password": "carolzinha10"
    }
    
email - String 
password - String

Response: 

    {
        "token": "$2b$10$/Lj/0YuUHxFvWhrmS9NXVO7.YyZvOzStocnFVWGLZsVAIlYsL3nlG"
    }

Response when the user inform the wrong email or password:

    {
        "error": "Incorrect email or password."
    }
    
####````{{url}}/profile ->````

GET Profile - We use the express-session library to save the user id and isAdmin attributes on variables that we can use 
in any file and it is related with the authenticated user. It will return the authenticated user data.

HEADERS
token    {{token}}

Response:

    {
        "id": 1,
        "name": "Carol",
        "email": "caroline@gmail.com",
        "password": "$2b$10$HlYHWaRttu54vFP2ITmkBeVvkPtxPfVV6eTPsek5GZqAvw5g/geRS",
        "phoneNumber": "981461990",
        "document": "15871239757",
        "isAdmin": 1,
        "address": "rua garnier",
        "description": "descrição de mim",
        "createdAt": "2020-03-29T01:41:04.000Z",
        "updatedAt": "2020-03-29T01:41:04.000Z"
    } 
        
####````{{url}}/logout ->````

GET Logout - The logout function find the Session object int he session table and destroy it and destroy the information saved
in the req.session cookie. 

HEADERS
token    {{token}}

Response:

    {
        "message": "You have been logged out"
    }

####````{{url}}/:jobId/apply ->````

GET Apply - Create a Candidature object witch is associated with Job, a job can have many candidatures. The job id must be informed
on the params session. It will return the Candidature, the adminId attributes is from the user who created the Job.

HEADERS
token    {{token}}

PATH VARIABLES
jobId   INTEGER

Response: 

    {
        "id": 7,    
        "jobId": "10",
        "adminId": 15,
        "userId": 16,
        "updatedAt": "2020-03-29T03:08:37.747Z",
        "createdAt": "2020-03-29T03:08:37.747Z"
    }
    
####````{{url}}/candidature/:candidatureId/delete````

GET Remove candidature - Sends the id of the candidature through the params and then delete the Candidature from the database. 
Return a message of success. Only the owner of the application can delete it.

HEADERS
token    {{token}}

PATH VARIABLES
candidatureId   INTEGER

Response:

    {
        "message": "Candidature deleted"
    }

####````{{url}}/profile/update -> ````
        
POST Update user - The request must contain at least one of the attributes of User and the update function um verify witch one is and
replace then on the authenticated user. Return the user information. The email and document attributes can not be updated

HEADERS
Content-Type    application/json
token    {{token}}

Request:

    {
        "address": "rua juscelino K",
        "name": "Caroline de Souza"
    }
    
Response:

    {
        "id": 1,
        "name": "Caroline de Souza",
        "email": "caroline@gmail.com",
        "password": "$2b$10$7pyHe2K8ExQxul4X07xJC.oxREd7RCqsL2yHErCP4r4/cK4EoLT/q",
        "phoneNumber": "981461990",
        "document": "373.996.890-75",
        "isAdmin": 1,
        "address": "rua juscelino K",
        "description": null,
        "createdAt": "2020-03-29T02:56:44.000Z",
        "updatedAt": "2020-03-29T03:43:54.000Z"
    }
    
####````{{url}}/profile/delete ->````

GET Delete user - Destroy in the Users table the authenticated user and return a success message. 

HEADERS
token    {{token}}

Response: 

    {
        "message": "User deleted"
    }

####````{{url}}/ ->````

GET jobs - Find all Jobs on the db and displays then. The user doesn't need to be authenticated to access this route. 

Response: 

    [
        {
            "id": 1,
            "position": "full stack Developer",
            "description": "vue e essas coisas",
            "userId": 16,
            "salary": 2000,
            "workload": null,
            "benefits": null,
            "companyAddress": null,
            "createdAt": "2020-03-29T03:50:02.000Z",
            "updatedAt": "2020-03-29T03:50:02.000Z"
        },
        {
            "id": 2,
            "position": "Back-end Developer",
            "description": "php e essas coisas",
            "userId": 16,
            "salary": 2000,
            "workload": null,
            "benefits": null,
            "companyAddress": null,
            "createdAt": "2020-03-29T03:50:20.000Z",
            "updatedAt": "2020-03-29T03:50:20.000Z"
        },
        {
            "id": 3,
            "position": "front-end Developer",
            "description": "vue e essas coisas",
            "userId": 16,
            "salary": 2000,
            "workload": null,
            "benefits": null,
            "companyAddress": null,
            "createdAt": "2020-03-29T03:50:29.000Z",
            "updatedAt": "2020-03-29T03:50:29.000Z"
        },
        {
            "id": 4,
            "position": "QA",
            "description": "testes e essas coisas",
            "userId": 16,
            "salary": 2000,
            "workload": null,
            "benefits": null,
            "companyAddress": null,
            "createdAt": "2020-03-29T03:50:42.000Z",
            "updatedAt": "2020-03-29T03:50:42.000Z"
        }
    ]        
        
####````{{url}}/admin/create  ->````

POST Create Job -> Only admins (isAdmin flag was set 1) can add jobs in the API, a user can change the isAdmin attribute on the update route
anytime. This function create a new Job with the attributes received in the request. It must return the new Job.

HEADERS
Content-Type    application/json
token   {{token}}

BODY    json   

Request: 

    {
        "position": "QA",
        "description": "testes e essas coisas",
        "salary": 2000
    }

position - String
description - String
salary - Float
workload - Float (optional)
benefits - String (optional)
companyAddress- String (optional)

Response: 

    {
        "id": 4,
        "position": "QA",
        "description": "testes e essas coisas",
        "userId": 16,
        "salary": 2000,
        "updatedAt": "2020-03-29T03:50:42.892Z",
        "createdAt": "2020-03-29T03:50:42.892Z"
    }
    
####````{{url}}/job/:jobId ->````

GET Find job - Receive a jobId through the params and find it at the db and displays the Job. 

PATH VARIABLES
jobId   INTEGER

Response:

    {
        "id": 4,
        "position": "QA",
        "description": "testes e essas coisas",
        "userId": 16,
        "salary": 2000,
        "workload": null,
        "benefits": null,
        "companyAddress": null,
        "createdAt": "2020-03-29T03:50:42.000Z",
        "updatedAt": "2020-03-29T03:50:42.000Z"
    }
    
Error response: 

    {
        "error": "Job not foud"
    }

####````{{url}}/position/:position -> ````

GET Find job by position - Receive a position attribute through the params and find it at the db and displays the Job. 

PATH VARIABLES
position   String

Response:

    {
        "id": 2,
        "position": "Back-end Developer",
        "description": "php e essas coisas",
        "userId": 16,
        "salary": 2000,
        "workload": null,
        "benefits": null,
        "companyAddress": null,
        "createdAt": "2020-03-29T03:50:20.000Z",
        "updatedAt": "2020-03-29T03:50:20.000Z"
    }

####````{{url}}/users/:name ->````

GET Find user by name - Receive a name attribute through the params and find it at the db and displays SOME of the User information. 

HEADERS
token   {{token}}

PATH VARIABLES
name   String

Response:

    {
        "name": "caroline",
        "email": "caroline@gmail.com",
        "phoneNumber": "981461990",
        "description": null
    }

####````{{url}}/:jobId/candidatures ->````

GET Candidatures -Receive the id of a Job and displays all the Candidatures associated with this Job. A Job can have many
candidatures. Only the user who created the Job can see the candidatures. 

HEADERS
token   {{token}}

PATH VARIABLES
jobId   INTEGER 

Response: 

    [
        {
            "id": 8,
            "adminId": 16,
            "jobId": 14,
            "userId": 17,
            "createdAt": "2020-03-29T04:08:44.000Z",
            "updatedAt": "2020-03-29T04:08:44.000Z"
        },
        {
            "id": 9,
            "adminId": 16,
            "jobId": 14,
            "userId": 20,
            "createdAt": "2020-03-29T04:10:17.000Z",
            "updatedAt": "2020-03-29T04:10:17.000Z"
        }
    ]
    

####````{{url}}/candidature/:candidatureId ->````

GET Show candidature - Receive a candidatureId attribute through the params and find it at the db and displays the candidature. (TODO: also displays the information of the user who applied)

HEADERS
token   {{token}}

PATH VARIABLES
candidatureId   INTEGER 

Response: 

    {
        "id": 9,
        "adminId": 16,
        "jobId": 14,
        "userId": 20,
        "createdAt": "2020-03-29T04:10:17.000Z",
        "updatedAt": "2020-03-29T04:10:17.000Z"
    }
    


####````{{url}}/:candidatureId/comment ->````

POST Create Comment -  This function create a new comment with the attributes received in the request. It must return the new comment. The admin can
add many comments associated with one Candidature. 

HEADERS
Content-Type    application/json
token   {{token}}

BODY    json 

Request:   

    {
        "comment": "muito bom 5 estrelas"
    }

comment - String

Response: 

    {
        "id": 4,
        "candidatureId": "9",
        "comment": "muito bom 5 estrelas",
        "updatedAt": "2020-03-29T04:27:13.093Z",
        "createdAt": "2020-03-29T04:27:13.093Z"
    }

####````{{url}}/:candidatureId/comments ->````

GET Show comments - Receive a candidatureId attribute through the params and find it at the db and displays all the comments associated with this candidature.

HEADERS
token   {{token}}

PATH VARIABLES
candidatureId   INTEGER 

Response:

    [
        {
            "id": 4,
            "candidatureId": 9,
            "comment": "muito bom 5 estrelas",
            "createdAt": "2020-03-29T04:27:13.000Z",
            "updatedAt": "2020-03-29T04:27:13.000Z"
        },
        {
            "id": 5,
            "candidatureId": 9,
            "comment": "pode melhorar mas ainda assim ta bom",
            "createdAt": "2020-03-29T04:28:53.000Z",
            "updatedAt": "2020-03-29T04:28:53.000Z"
        }
    ]

####````{{url}}/job/:jobId/delete ->````

GET Delete Job - Receive a jobId attribute through the params and destroy it in the Jobs table.

HEADERS
token    {{token}}

Response: 

    {
        "message": "User deleted"
    }



