import { model, Schema, Types } from "mongoose"

const eventSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 150
    },
    description: {
        type: String,
        minlength: 20
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    capacity: {
        type: Number,
        min: 1,
        validate: {
            validator: Number.isInteger,
        }
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    status: {
        type: String,
        enum: ["scheduled", "cancelled", "finished"],
        default: "scheduled"
    },
    location: {
        venue: {
            type: String,
            minlength: 3,
            maxlength: 100
        },
        address: {
            type: String,
            minlength: 5,
            maxlength: 150
        },
        city: {
            type: String,
            minlength: 2,
            maxlength: 50
        }
    },
    organizer: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    categories: [{
        type: Types.ObjectId,
        ref: "Category"
    }],
})

export const eventModel = model("Event", eventSchema);