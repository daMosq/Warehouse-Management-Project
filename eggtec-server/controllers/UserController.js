// user-ctrl.js
// user controler handles login and registration from client

// user data base model
const User = require('../models/UserModel')

// login user
// router.post('/login', UserCtrl.loginUser)
loginUser = async (req, res) => {

    console.log("login: " + JSON.stringify(req.body))

    // find user in data base
    await User.findOne( req.body , (err, user) => {
        if (err) {
            return res.status(400).json({ success: false,  error: err })
        }
       console.log(user)

        // user not found
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

     // succes, return user id as a token
        return res.status(200).json({ success: true, token: user._id, data: user })
    }).catch(err => console.log(err))
}


// register user
// router.post('/register', UserCtrl.registerUser)
registerUser = (req, res) => {

    console.log("register user")


    // get registration info
    const body = req.body
    console.log(body);

    // validate registration info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    // make new user
    const user = new User(body)
    console.log(user);

    // user not created
    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    // save user in data base
    user
        .save()
        .then(() => {
            console.log("User registered!");
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User registered!',
            })
        })
        .catch(error => {
            console.log("User not registerd!");
            return res.status(400).json({
                error,
                message: 'User not registered!',
            })
        })
}

// update user
// router.put('/user/:id', UserCtrl.updateUser)
updateUser = async (req, res) => {
    console.log('updateUser')
    // get user info
    const body = req.body
    console.log(JSON.stringify(body))
    console.log(req.params.id)
    // validate user info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    // find user in data base
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'user not found!',
            })
        }
        console.log('user')
        console.log(user)
        console.log('End of users')
        // upate user info
        user.firstName = body.firstName
        user.lastName = body.lastName
        user.company = body.company
        user.email = body.email
        user.password = body.password
        console.log(JSON.stringify(user))
        // save update user info to data base
        user
            .save()
            .then(() => {
                console.log('User updated!')
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                console.log('User not updated!')
                console.log(error)
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

// delete user
// router.delete('/user/:id', UserCtrl.deleteUser)
deleteUser = async (req, res) => {

    // find and delete user from data base
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {

            // database error
            return res.status(400).json({ success: false, error: err })
        }

        // user not found
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        // return success
        return res.status(200).json({ success: true, data: user })

    }).catch(err => console.log(err))
}

// get user by id
// router.get('/user/:id', UserCtrl.getUserById)
getUserById = async (req, res) => {

    // look for user in data base
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // user not found
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        // return sucess
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

// get list of users
getUsers = async (req, res) => {

    console.log("get users");

    // get all users from data base {}
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // no users in data base
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `no users available` })
        }

        // return success
        return res.status(200).json({ success: true, data: users })

    }).catch(err => console.log(err))
}

// export all user controller functions
module.exports = {
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
}
