module.exports = function (app) {
    require('./routes/questiontopic.route')(app);
    require('./routes/question.route')(app);
    require('./routes/config.route')(app); 
    require('./routes/quiz.route')(app);
    require('./routes/topic.route')(app);
    require('./routes/user.route')(app);
    require('./routes/answer.route')(app);
    

    // require('./route/Device')(app);
    // require('./route/Service')(app);
};
