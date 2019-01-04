import mongoose from 'mongoose';
const Schema = mongoose.Schema, 
                ObjectId = Schema.ObjectId;

let groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        maxlength: [20, 'maxLenght <= 20']
    },
    lastMessage: {
        type: ObjectId
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: ObjectId,
        ref: 'User'
    }],
    deleteAt: {
        type: Date,
        default: null
    }
});

groupSchema.pre('find', function(){
    const query = this.getQuery();
    query['$and'] = [
        {
            deleteAt: null
        }
    ]
});

groupSchema.pre('findOne', function(){
    const query = this.getQuery();
    query['$and'] = [
        {
            deleteAt: null
        }
    ]
});

groupSchema.pre('findById', function(){
    const query = this.getQuery();
    query['$and'] = [
        {
            deleteAt: null
        }
    ]
});

var Group = mongoose.model('Group', groupSchema);

export default Group;