let Product = require('./models/Product')
console.log(Product)

async function create(){
    try {
        Product.create({
            name :'Dummy Product',
            sku: "1234",
            quantity: 8,
            price: 159.99,
            currency: "INR",
            category: 'Other'
        }).then((pro)=>console.log(pro.toJSON()))
        .catch((error) => console.error(error));;
        console.log(pro)
    }catch(e){
        console.log(e)
    }
}
create();
