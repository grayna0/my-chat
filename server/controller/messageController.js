const MessageModel = require("../model/MessageModel")


module.exports.addMessage = async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await MessageModel.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
  
      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  };
module.exports.getAllMessage = async (req, res, next) => {
    try {
        const {from, to} = req.body
        const message = await MessageModel.find({
            users:{
                $all:[from, to]
            }
        }).sort({updatedAt:1})
        const projectMessage =message.map( (msg) => {
            return {
                fromseft:msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        return res.json(projectMessage)
    } catch (ex) {
        next(ex)
    }
}