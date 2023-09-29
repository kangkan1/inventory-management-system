module.exports.home = function(req, res){
    //return res.end('<h1>Running</h1>');
    console.log("here")
    return res.render('home', {title: "Home"})
}

module.exports.search = function(req, res){
    //return res.end('<h1>Running</h1>');
    const searchTerm = req.query.val;
    console.log(searchTerm)
    res.json({
        message: 'Data received successfully',
        data: searchTerm
    });
    console.log("here")
    return res.render('home', {title: "Home"})
}