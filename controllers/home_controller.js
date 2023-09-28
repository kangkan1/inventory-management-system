module.exports.home = function(req, res){
    //return res.end('<h1>Running</h1>');
    console.log("here")
    return res.render('home', {title: "Home"})
}