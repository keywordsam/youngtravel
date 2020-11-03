const mongoose = require("mongoose");

let CategorySchema = mongoose.Schema({
  name: {
    type: String,
  },
  isShow: {
    type: Boolean,
    default: true,
  },
});
CategorySchema.statics.insertManyAmdUpdateOne = function (data, callback) {
  //要注意statics 后面的s
  let { _id, ...value } = data;
  if (_id) {
    return this.model("Category").updateOne({ _id }, value, callback);
  } else {
    return this.model("Category").insertMany(value, callback);
  }
};

module.exports = mongoose.model("Category", CategorySchema);
