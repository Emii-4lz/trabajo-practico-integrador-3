import { model, Schema } from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    description: {
        type: String,
        required: false,
        maxlength: 200
    },
})

categorySchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'categories'
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

export const categoryModel = model("Category", categorySchema);