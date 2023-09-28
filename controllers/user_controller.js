module.exports.profile = function(req, res){
    return res.end('<h1>User Profile</h1>');
}

module.exports.index = function(req, res){
    return res.end('<h1>Index Profile</h1>');
}

module.exports.error = function(req, res){
    return res.end('<h1>SOme error occurred</h1>');
}