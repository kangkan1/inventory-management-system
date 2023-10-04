const express = require('express');
const app = express();
const port  = 3000

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());

// For URL encoded data
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index.js'))
app.use(express.static('public'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
    console.log(`Server is running in port: ${port}`)
})


/*
CREATE TABLE product (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text(512) NOT NULL,
    sku text(1028),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,3) NOT NULL,
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    currency text(10)
    );
    insert into product (id, name, sku, quantity, price, currency) values (1, "Pool Table (1.4m*2m Small)","PTSM001",7, 16999,"INR" );
    insert into product (id, name, sku, quantity, price, currency) values (2, "Pool Table (1.7m*2.5m Medium)","PTMM002",5, 18999,"INR" );
    insert into product (id, name, sku, quantity, price, currency) values (3, "Pool Table (2.1m*2.9m Large)","PTLL003",4, 21999,"INR" );

    alter table product add column category text(50);

    insert into product (id, name, sku, quantity, price, currency, category) values (4, "Kitchen Stand, 5 layer kitchen stand (Steel) for Home","RCK001",7, 999,"INR", "Rack");

    update product set category = "Pool Table";
*/