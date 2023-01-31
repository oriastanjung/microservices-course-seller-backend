const bcrypt = require('bcryptjs');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        email : 'email|empty:false',
        password : 'string|min:6',
    };
    const {email, password} = req.body;
    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(400).json({
            status : "error",
            message: validate
        })
    }

    const user = await User.findOne({
        where : {
            email : email
        }
    })

    if(!user){
        return res.status(404).json({
            status : "error",
            message : "Account Not Found"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        return res.status(404).json({
            status : "error",
            message : "Invalid Credentials"
        })
    } 

    return res.json({
        status : "success",
        data : {
            id : user.id,
            name : user.name,
            email : user.email,
            role : user.role,
            avatar : user.avatar,
            profession : user.profession
        }
    })

}

