const sqlite3 = require('sqlite3').verbose();
const qrCode = require('qrcode');
let Product = require('../models/Product')

const db = new sqlite3.Database('./db/db.sqlite');

module.exports.home = function(req, res){
    //return res.end('<h1>Running</h1>');
    console.log("here")
    
    db.serialize(() => {
      db.all(`select DISTINCT(name) as category from category where status ="ACTIVE" limit 50`, (err, rows) => {
      if (err) {
        console.log(err)
        // throw err;
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
        db.all(`SELECT id, name, sku, price, currency, category FROM products where name like "%${searchTerm}%" or sku like "%${searchTerm}%" or category like "%${searchTerm}%"`, (err, rows) => {
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
        });
        });
      });
}

module.exports.product = function(req, res){
  //return res.end('<h1>Running</h1>');
  console.log("here product");
  const id = req.query.id;
  console.log("id:"+id)
  db.serialize(() => {
    db.all(`SELECT * FROM products where id=${id} limit 1;`, (err, rows) => {
      if(err){
        return res.render('error')
        throw err;
      }else{
        if(rows.length <1){
          return res.render('error')
        }
        let data = 'SKU:'+rows[0]['sku']+", Name: "+rows[0]['name']+", Created at: "+rows[0]['created_at'];
        qrCode.toDataURL(data, (err, url) => {
          if (err) throw err;
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

module.exports.category = function(req, res){
  //return res.end('<h1>Running</h1>');
  const category = req.query.category;
  console.log(category)
  db.serialize(() => {
    db.all(`SELECT * FROM products where category = "${category}" limit 50;`, (err, rows) => {
      if(err){
        return res.render('error')
      }else{
        
        // res.json({
        //   'message':"ok",
        //   'product':rows
        // })
        let arr = []
        for(let i=0;i<rows.length;i++){

        }
        return res.render('category', {title: "Category | "+category, category:rows})
        
      }
    });
  });
  
}

module.exports.create = function(req, res){
  //return res.end('<h1>Running</h1>');
  console.log("here create")
  
  let body = req.body
  console.log(body)
  let verify = verifyData(body)
  if(verify['status']){
    Product.create({
      name :body.product_name,
      sku: body.sku,
      quantity: body.quantity,
      price: body.price,
      currency: body.currency,
      category: body.category
  }).then((pro)=>{
    console.log("id:")
    console.log(pro.get('id'))
    console.log(pro.id)
    res.json({
      message: verify['message'],
      'status':'success'
    });
    console.log("saved")
    console.log(pro.toJSON())
  })
  .catch((error) =>{
    res.json({
      message: error,
      'status':'faile'
    });
  });;
  }else{
    res.json({
      message: verify['message'],
      'status':'fail'
    });
  }

  // console.log(req)
  // return res.render('add', {title: "Add New Product"})
  
  
}

function verifyData(data){
  console.log("data");
  console.log(data['product_name'])
  if(data['product_name'].length<5){
    return {
      'status':false,
      'message':"Product Name cannot be blank and should be atleast 5 character"
    };
  }
  if(data['sku'].length<1){
    return {
      'status':false,
      'message':"SKU cannot be blank and should be atleast 5 character"
    };
  }
  var number_pattern = /^\d+\.\d{0,2}$/;
  let p = data['price']
  if(!number_pattern.test(p)){
    return {
      'status':false,
      'message':"Price should be number with upto 2 decimal"
    };
  }
  if(data['currency'].length < 1){
    return {
      'status':false,
      'message':"Currency cannot be empty"
    };
  }
  // console.log(category.options[category.selectedIndex].value)
  if(data['category'].length < 1){
    return {
      'status':false,
      'message':"Please select a Category"
    };
  }
  let qty = data['quantity'];

  number_pattern = /^\d+$/;
  // console.log(qty)
  if(!number_pattern.test(qty)){
    return {
      'status':false,
      'message':"Quntity has to be an integer"
    };
  }


  // everything is right
  return {
      'status':true,
      'message':"Saved successfully"
    };
}