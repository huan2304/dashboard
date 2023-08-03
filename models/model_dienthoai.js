const { default: mongoose } = require('mongoose');
const schema_dienthoai= require('./../schemas/schema_dienthoai');
const model_dienthoai = new mongoose.model("model_dienthoai", schema_dienthoai, "dienthoai");

module.exports = {
    getItems: async () => {
        var items;
        items = await model_dienthoai.find({});
        return items;
    },
    saveCategory: async (category) => {
        let categorymoi = new model_category ({ten: category.ten, slug: category.slug, trangthai: category.trangthai, Created: category.created});
        await categorymoi.save();
    },
    deleteCategory: async (id) => {
        let rs = await model_category.deleteOne({_id: id});
        console.log(rs);
    },
 

 }