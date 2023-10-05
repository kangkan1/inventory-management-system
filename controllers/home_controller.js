const sqlite3 = require('sqlite3').verbose();
const qrCode = require('qrcode');

const db = new sqlite3.Database('./db/db.sqlite');

module.exports.home = function(req, res){
    //return res.end('<h1>Running</h1>');
    console.log("here")
    
    db.serialize(() => {
      db.all(`select distinct category from product limit 10`, (err, rows) => {
      if (err) {
        console.log(err)
        throw err;
        return res.render('home', {title: "Home", 'categories':[]})
      }
      return res.render('home', {title: "Home", 'categories':rows})
    });
  }); 
}

module.exports.search = function(req, res){
    //return res.end('<h1>Running</h1>');
    const searchTerm = req.query.val;
    // console.log(searchTerm)
    // console.log(`SELECT id, name, sku, price, currency FROM product where name like "%${searchTerm}%" or sku like "%${searchTerm}% or category like "%${searchTerm}%"`)
    db.serialize(() => {
        db.all(`SELECT id, name, sku, price, currency, category FROM product where name like "%${searchTerm}%" or sku like "%${searchTerm}%" or category like "%${searchTerm}%"`, (err, rows) => {
          if (err) {
            console.log(err)
            throw err;
          }
          // Handle the rows from the query
          // console.log(rows);
          let out = [];
          if(rows.length>0){
            
            for(let i=0;i<rows.length;i++){
                out.push({
                    'url':"/product?id="+rows[i].id,
                    'text':rows[i].name+", "+rows[i].currency+" "+rows[i].price
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
    
    // console.log("here")
    // return res.render('home', {title: "Home"})
}

module.exports.product = function(req, res){
  //return res.end('<h1>Running</h1>');
  console.log("here product");
  const id = req.query.id;
  console.log("id:"+id)
  db.serialize(() => {
    db.all(`SELECT * FROM product where id=${id} limit 1;`, (err, rows) => {
      if(err){
        return res.render('error')
      }else{
        if(rows.length <1){
          return res.render('error')
        }
        let data = 'SKU:'+rows[0]['sku']+", Name: "+rows[0]['name']+", Created at: "+rows[0]['created_at'];
        qrCode.toDataURL(data, (err, url) => {
          if (err) throw err;
  
          // Render EJS template with QR code data
          // res.render('index', {  });
          return res.render('product', {title:"Product", product:rows, qrCodeData: url})
      });

        
      }
    });
  });
}

module.exports.add = function(req, res){
  //return res.end('<h1>Running</h1>');
  console.log("here add")
  // return res.render('add', {title: "Add New Product"})
  db.serialize(() => {
    db.all(`SELECT DISTINCT(name) FROM category where status ="ACTIVE" limit 50`, (err, rows) => {
      if(err){
        return res.render('error')
      }else{
        console.log(rows)
        return res.render('add', {title: "Add New Product", category:rows})

        
      }
    });
  });
  
  
}