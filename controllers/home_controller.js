const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/db.sqlite');

module.exports.home = function(req, res){
    //return res.end('<h1>Running</h1>');
    console.log("here")
    return res.render('home', {title: "Home"})
}

module.exports.search = function(req, res){
    //return res.end('<h1>Running</h1>');
    const searchTerm = req.query.val;
    console.log(searchTerm)
    db.serialize(() => {
        db.all(`SELECT id, name, sku, price, currency FROM product where name like "%${searchTerm}%"`, (err, rows) => {
          if (err) {
            console.log(err)
            throw err;
          }
          // Handle the rows from the query
          console.log(rows);
          let out = [];
          if(rows.length>0){
            
            for(let i=0;i<rows.length;i++){
                out.push({
                    'url':"#",
                    'text':rows[i].name+", "+rows[i].currency+""+rows[i].price
                })
            }
          }
          res.json({
            message: 'Data received successfully',
            results: out,
            'status':'success',
            // 'results':[
            //     {
            //         'url':"#",
            //         'text':"Some Data 1"
            //     },
            //     {
            //         'url':"#",
            //         'text':"Some Data 2"
            //     }
            // ]
        });
        });
      });
    
    console.log("here")
    // return res.render('home', {title: "Home"})
}