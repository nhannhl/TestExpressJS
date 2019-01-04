import mongoose from 'mongoose';
const Schema = mongoose.Schema, 
                ObjectId = Schema.ObjectId;

let userSchema = new Schema({
    gender: Boolean,
    firstName: {
    	type: String,
    	required: [ true, 'firstName is required field!'],
    	maxlength: [ 255, 'firstName is too long!' ]
    },
    lastName: {
    	type: String,
    	required: [ true, 'lastName is required field!'],
    	maxlength: [ 255, 'lastName is too long!' ],
    	trim: true,
    	uppercase: true,
    },
    email: {
    	type: String,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
    	type: String,
    	required: [ true, 'password is required field!'],
    	maxlength: [ 20, 'password is too long!' ]
    },
    age: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: props => `${props.value} is not a integer number!`
        }
    },
    isDelete: {
    	type: Boolean,
    	default: false
    },
    deletedAt: Date,
});

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
});

userSchema.pre('find', function() {
    const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        }
    ]
});

userSchema.pre('findOne', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        }
    ]
});

let User = mongoose.model('User', userSchema);

export default User;
