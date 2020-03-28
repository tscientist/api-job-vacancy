# node-api-pagamentos

**Installation**
clone this repository
create a database on your machine that matches the development in ./config/config-example.json 
create and update the config.json file's development object with your own local MYSQL database settings.
run npm install in your CLI
run sequelize db:migrate in your CLI
run npm start in your CLI


    
    app.post('/createUser', userController.create)

    app.post('/login', userController.login);

    app.get('/profile', userController.profile);

    app.get('/:name', userController.findUser)

    app.get('/logout', userController.logout);

    app.get('/profile/applications', userController.candidatures);

    app.post('/profile/update', userController.update);

    app.get('/profile/delete', userController.update);
    app.get('/', jobController.index);

    app.post('/admin/create', jobController.create)

    app.get('/:jobId', jobController.showJob)

    app.get('/:position', jobController.findJob)

    app.get('/:jobId/apply', candidatureController.create)

    app.get('/:jobId/delete', jobController.delete)

    app.get('/:jobId/applications', candidatureController.allCandidatures)

    app.get('/candidature/:candidatureId', candidatureController.showCandidature)

    app.post('/:candidatureId/comment', commentController.create)

    app.get('/:candidatureId/comments', commentController.allComments)

    app.get('/:candidatureId/delete', candidatureController.delete)
