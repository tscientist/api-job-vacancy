# node-api-pagamentos

**Installation**
clone this repository
create a database on your machine that matches the development in ./config/config-example.json 
create and update the config.json file's development object with your own local MYSQL database settings.
run npm install in your CLI
run sequelize db:migrate in your CLI
run npm start in your CLI

**endpoints da API**

/createUser
    
/login

/profile

/users/:name
    
/logout

/:jobId/apply    


    
        app.get('/candidature/:candidatureId/delete', middlewares.isAuthenticated, candidatureController.delete)
    
        app.post('/profile/update', middlewares.isAuthenticated, userController.update);
    
        app.get('/profile/delete', middlewares.isAuthenticated, userController.delete);
        
        app.get('/', jobController.index);
        
        app.post('/admin/create', middlewares.isAuthenticated, jobController.create)
    
        app.get('/job/:jobId', jobController.showJob)
    
        app.get('/position/:position', jobController.findJob)
    
        app.get('/:jobId/candidatures', middlewares.isAuthenticated, candidatureController.allCandidatures)
    
        app.get('/candidature/:candidatureId', middlewares.isAuthenticated, candidatureController.showCandidature)
    
        app.get('/job/:jobId/delete', middlewares.isAuthenticated, jobController.delete)
    
        app.post('/:candidatureId/comment', middlewares.isAuthenticated, commentController.create)
    
        app.get('/:candidatureId/comments', middlewares.isAuthenticated, commentController.allComments)