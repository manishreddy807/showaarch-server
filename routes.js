const router = require('express').Router()
const registerdetail = require('./registeredDetails')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Products = require( './models/Products' );

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;
        let exist = await registerdetail.findOne({email})
        const username = exist.username
        if(!exist){
            return res.status(400).json({message: 'User Email not Found'})
        }
        const cmp = await bcrypt.compare(password, exist.password)
        if(!cmp){
            return res.status(400).json({message: 'Invalid Password'})
        }
        let payload = {
            user: {
                id : exist.id
            }
        }
        jwt.sign(payload, 'jwtSecret', {expiresIn: 3600000},
        (err, token) => {
            if(err) throw err;
            return res.json({token, message:'Login Success', email, username})
        }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Server Error'})
    }
})


router.post('/register', async(req, res) => {
    const {username, email, password} = req.body
    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const insertData = await registerdetail.create({
            username: username,
            email: email,
            password: hashedPwd,
        })
        res.status(200).json({message: 'User Created Successfully', data: insertData})
    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.post("/addproducts", async (req, res) => {
    try {
        const {id, image, title, price} = req.body
        let newProducts = new Products ({
            id,
            image,
            title,
            price,
        })
        await newProducts.save()
        res.status(200).send('Product Added Succesfully')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error')
    }
})

router.get("/products", async (req, res) => {
    try{
        const allData = await Products.find()
        return res.json(allData)

    }
    catch (error){
        console.log(error)
        return res.status(400).send('Server Error')
    }
})



module.exports = router