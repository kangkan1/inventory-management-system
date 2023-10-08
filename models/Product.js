const { Sequelize,DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/db.sqlite'
  });
  
  
//   async function checkDatabaseConnection() {
//     try {
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//       // Perform synchronous operations after successful connection here
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//       // Handle error and perform synchronous operations accordingly
//     }
//   }
  
//   checkDatabaseConnection();

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(512),
        allowNull: false
    },
    sku:{
        type: Sequelize.STRING(128)
    },
    quantity:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    price:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    created_by:{
        type: Sequelize.NUMBER
    },
    created_at:{
        type: Sequelize.DATE
    },
    currency:{
        type: Sequelize.STRING(10),
        allowNull: false
    },
    category:{
        type: Sequelize.STRING(50),
        allowNull: false
    }
    
},{ timestamps: false })

module.exports = Product;
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


CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text(512) NOT NULL,
    status text(10) DEFAULT "INACTIVE"
);

insert into category (name, status) values ("Pool Table", "ACTIVE");
insert into category (name, status) values ("Table", "ACTIVE");
insert into category (name, status) values ("Rack", "ACTIVE");
insert into category (name, status) values ("Kitchen Appliances", "ACTIVE");
insert into category (name, status) values ("Home Appliances", "ACTIVE");
insert into category (name, status) values ("Bed", "ACTIVE");
insert into category (name, status) values ("Chair", "ACTIVE");
insert into category (name, status) values ("Outdoor Appliances", "ACTIVE");
insert into category (name, status) values ("Other", "ACTIVE");
*/