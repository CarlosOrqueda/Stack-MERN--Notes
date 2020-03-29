import User from '../models/User';

const usersController = {};

usersController.getUsers = async (req, res) => {
    try {
        const users = await User.find().lean();
        res.json(users);
    } catch (e) {
        console.log(e);
    }
};

usersController.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({message: "User saved"});
    } catch (e) {
        console.log(e);
        res.json({message: "Existing user"})
    }
};

usersController.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete(req.params.id);
        res.json({message: "User deleted"});
    } catch (e) {
        console.log(e);
    }
};

module.exports = usersController;