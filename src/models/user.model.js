import moongose from 'moongose';
import moongosePaginate from 'moongose-paginate-v2';

const userCollection = 'plantas';

const userSchema = moongose.Schema({
    id: Number,
    name: String,
    price: Number,
    descripction: String
})

userSchema.plugin(moongosePaginate);
const userModel = moongose.model(userCollection, userSchema);

export default userModel;