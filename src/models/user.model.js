import { model, Schema } from "mongoose"

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        //Todo: formato valido, isEmail()
    },
    password: {
        type: String,
        required: true
        //Todo: hasheala papi
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profile: {
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        birthDate: {
            type: Date,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        }
    },
    deletedAt: {
        type: Date,
        default: null
    },
});

UserSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'organizer'
})

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

export const userModel = model("User", UserSchema);