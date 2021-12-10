const { hasSubscribers } = require('diagnostics_channel');
const express = require('express');
const app = express();
require('../src/db/connect')
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcrypt');
const Register = require('./model/register');
const ProductRegister = require('./model/product');
const port = process.env.PORT || 5000;

const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use("/static", express.static('../public/index'));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render('index')
});

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/adminDashboard', (req, res) => {
    res.render('adminDashboard');
})

app.get('/myProduct', async (req, res) => {
    try{
        const product = await ProductRegister.find();
        // console.log(product)
        const productList = product.map((currentValue) => {
            return `<tr>
            <td>${currentValue.productId}</td>
            <td>${currentValue.productName}</td>
            <td>${currentValue.brandName}</td>
            <td>${currentValue.productDescription}</td>
            <td>{{product.is_approved}}</td>
</tr>`
        });
        console.log(productList);
        res.render('myProduct');
    }catch(err){
        res.send(`error occured ${err}`);
    }   
})

app.get('/createProduct', (req, res) => {
    res.render('createProduct');
})
//login user
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;
        const user = await Register.findOne({ email: email });
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            if (user.user_type == 1) {
                res.redirect('adminDashboard');
            } else {
                res.redirect('myProduct');
            }
        }
        else {
            res.send('wrong details')
        }
    } catch (err) {
        res.send(`Errr in catch ${err}`);
    }
})


//register user
app.post('/register', async (req, res) => {
    try {
        const user = new Register({
            fullname: req.body.fullname,
            email: req.body.email,
            mobile: req.body.mobile,
            user_type: req.body.user_type,
            password: req.body.password
        })

        const registered = await user.save();
        // console.log(registered);
        res.status(201).render('login');
    } catch (err) {
        res.status(400).send(`Error in the post ${err}`)
    }

})


//add product
app.post('/createProduct', async (req, res) => {
    try {
        const product = new ProductRegister({
            productId: req.body.productId,
            productName: req.body.productName,
            brandName: req.body.brandName,
            productDescription: req.body.productDesc
        })
        const productRegesiterd = await product.save();
        // console.log(productRegesiterd);
        res.redirect('myProduct')
    } catch (err) {
        res.send(err)
    }
})

app.get('/edit/:id', (req, res) => {

})

// app.post('/update', async (req, res)=>{
//     const updateProduct = new ProductRegister({
//         productId: req.body.productId,
//         productName: req.body.productName,
//         brandName: req.body.brandName,
//         productDescription: req.body.productDesc
//     })

//     const updatedProduct = await 
// })

app.listen(port, () => {
    console.log(`listing from ${port}`);
})