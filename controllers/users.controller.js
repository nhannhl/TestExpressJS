import User from '../models/user';
import Group from '../models/group';

const UsersController = {};

UsersController.getAll = async (req, res, next) => {
    try {
        let users = await User.find();
        let fullName = new Array();
        users.forEach((element) => {
            fullName[fullName.length] = element.fullName;
        });
        return res.status(200).json({ isSuccess: true, "data": fullName });
    } catch(err) {
        return next(err);
    }
}

UsersController.getUserById = async (req, res, next) => {
    try {
        let _id = req.params.id;
        if (!_id) {
            return next(new Error('ID required'));
        }   
        let user = await User.findById(_id);
        if (!user) {
            return next(new Error('Id not exists'));
        }
        return res.status(200).json({ isSuccess: true, user });
    } catch(err) {
        return next(err);
    }
}

UsersController.getUserByName = async (req, res, next) => {
    try {
        let user = await User.findOne({ lastName : `${req.params.name}` });
        if (!user) {
            return next(new Error('Name not exists'));
        }
        return res.status(200).json({ isSuccess: true, user });
    } catch(err) {
        return next(err);
    }
}

UsersController.getUserByRegexName = async (req, res, next) => {
    try {
        let user = await User.find({ lastName : { $regex: '.*' + req.params.name + '.*' } });
        if (!user) {
            return next(new Error('Name not exists'));
        }
        return res.status(200).json({ isSuccess: true, user });
    } catch(err) {
        return next(err);
    }
}

UsersController.addUser = async (req, res, next) => {
    try {
        let { gender, firstName, lastName, email, password, age } = req.body;
        if (!lastName || !password) {
            return next(new Error('Lastname/Password required'));
        }
        let user = new User({ gender, firstName, lastName, email, password, age });
        // user._id = ObjectId();
        await user.save();
        return res.status(200).json({ isSuccess: true, user });
    } catch(err) {
        return next(err);
    }
}

UsersController.updateUser = async (req, res, next) => {
    try {
        let { gender, firstName, lastName, email, password, age } = req.body;
        if (!lastName || !password) {
            return next(new Error('Lastname/Password required'));
        }
        let _id = req.params.id;
        if (!_id) {
            return next(new Error('Id required'));
        }
        let user = await User.findById(_id);
        if (!user) {
            return next(new Error('Id not exists'));
        }
        user.set(req.body);
        await user.save();
        return res.status(200).json({ isSuccess: true, user });
    } catch(err) {
        return next(err);
    }
}

UsersController.deleteUser = async (req, res, next) => {
    try {
        let _id = req.params.id;
        if (!_id) {
            return next(new Error('Id required'));
        }
        let user = await User.findById(_id);
        if (!user) {
            return next(new Error('Id not exists'));
        }
        user.isDelete = true;
        user.deletedAt = Date.now();
        user.save();
        return res.status(200).json({ isSuccess: true, user });
    } catch(err) {
        return next(err);
    }
}

UsersController.testPopulate = async (req, res, next) => {
    try {
        let users = await User.find({}).populate(`${Group}`)
        return res.status(200).json({ isSuccess: true, users });
    } catch(err) {
        return next(err);
    }
}

export default UsersController;
