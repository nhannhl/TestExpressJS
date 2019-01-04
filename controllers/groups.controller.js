import Group from '../models/group';
import User from '../models/user';
import { Schema } from 'mongoose';

const GroupsController = {};

GroupsController.newGroup = async (req, res, next) => {
    try {
        let {name, author} = req.body;
        if (!name || !author) {
            return next(new Error('Name/Author required'));
        }
        let user = await User.find({_id: author});
        if (!user) {
            return next(new Error('Author id not exists'));
        }
        let group = new Group({name, author});
        group.save();
        return res.status(200).json({ isSuccess: true, group });
    } catch(err) {
        return next(err);
    }
}

GroupsController.addMember = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return next(new Error('Id required'));
        }
        let group = await Group.findById(req.params.id);
        if (!group) {
            return next(new Error('Id not exists'));
        }
        if (!req.body.members) {
            return next(new Error('Members required'));
        }
        let user = await User.find({_id: {$in: req.body.members}});
        if (!user || user.length !== req.body.members.length) {
            return next(new Error('Members not exists'));
        }
        group.members = req.body.members;
        group.save();
        return res.status(200).json({ isSuccess: true, group });
    } catch(err) {
        return next(err);
    }
}

GroupsController.getAll = async (req, res, next) => {
    try {
        let groups = await Group.find();
        if (!groups) {
            return next(new Error('Groups have not value'));
        }
        return res.status(200).json({ isSuccess: true, groups });
    } catch(err) {
        return next(err);
    }
}

GroupsController.deleteGroup = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return next(new Error('Id required'));
        }
        let group = await Group.findById(req.params.id);
        if (!group) {
            return next(new Error('Id not exists'));
        }
        group.deleteAt = Date.now();
        group.save();
        return res.status(200).json({ isSuccess: true, group });
    } catch(err) {
        return next(err);
    }
}

GroupsController.updateAuthor = async (req, res, next) => {
    try {
        if (!req.params.id || !req.query.id) {
            return next(new Error('Id required'));
        }
        let group = await Group.findById(req.params.id);
        if (!group) {
            return next(new Error('Id not exists'));
        }
        let user = await User.findById(req.query.id);
        if (!user) {
            return next(new Error('UserId not exists'));
        }
        group.author = req.query.id;
        group.save();
        return res.status(200).json({ isSuccess: true, group });
    } catch(err) {
        return next(err);
    }
}

GroupsController.testPopulate = async (req, res, next) => {
    try {
        let group = await Group.find({})
        .populate('User')
        .populate({
            path: 'author',
            select: 'lastName email'
        })
        .populate({
            path: 'members',
            select: 'lastName email'
        });
        return res.status(200).json({ isSuccess: true, group });
    } catch(err) {
        return next(err);
    }
}

export default GroupsController;