const { validate_item_reg } = require('../../validatingMethods/validate');
const Item = require('../../schemas/item');
exports.items_register = async (req, res) => {
   try {
      let { error } = validate_item_reg(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      let data = new Item(req.body);
      data = await data.save();
      return res.send(data);
   } catch (err) { return res.status(400).send(err.message); }
}
exports.item_update = async (req, res) => {
   try {
      const { id } = req.params;
      let data = await Item.findByIdAndUpdate(id, req.body, { new: true }).lean();
      return res.send(data)
   } catch (err) { return res.status(400).send(err.message); }
}

exports.item_get_active = async (req, res) => {
   try {
      const { page, limit, active } = req.query;
      let query = {};
      query['active'] = Boolean(active);
      let data = await Item.aggregate([
         { $match: query },
         {
            $facet: {
               metadata: [{ $count: "total_items" },
               { $addFields: { page: page, limit: limit, pages: { $ceil: { $divide: ["$total_items", limit] } } } },
               ],
               data: [{ $skip: (page * limit - limit) }, { $limit: limit }],
            }
         },
      ])
      return res.send(data[0]);
   } catch (err) { return res.status(400).send(err.message); }

}
exports.getAllItems = async (req, res) => {
   try {
       let query = {};
       let users = await Item.aggregate([
           { $match: query },
       ])
       res.send(users)
   } catch (error) {
       return res.status(400).send(err.message);
   }
}


