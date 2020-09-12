module.exports = function (app) {
    require('./routes/topic.route')(app);
    // require('./route/Device')(app);
    // require('./route/Service')(app);
};
