// item controller
// handles all item data base requests from client

// Item table
const Item = require('../models/ItemModel')

// create item
createItem = async (req, res) => {

    console.log("create item")

    // get info
    const body = req.body
    console.log(body);

    // validate info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a item',
        })
    }

    // make new item
    const item = new Item(body)
    console.log(item);
    console.log(body)

    // item created
    if (!item) {
        return res.status(400).json({ success: false, error: err })
    }

    // save item in data base
    item
        .save()
        .then(() => {
            console.log("Item created");
            return res.status(201).json({
                success: true,
                id: item._id,
                message: 'Item created!',
            })
        })
        .catch(error => {
            console.log("Item not created!");
            return res.status(400).json({
                error,
                message: 'Item not created!',
            })
        })
}

// update item

updateItem = async (req, res) => {

    console.log("update item")

    // get updated item info
    const body = req.body

    // validate item info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    // find item in data base
    Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Item not found!',
            })
        }

        // update existing item
        item.itemName = body.itemName
        item.itemID = body.itemID
        item.availability = body.availability
        item.quantity = body.quantity
        item.unitPrice = body.unitPrice
        


        // update item in data base
        item
            .save()
            .then(() => {

                // return success
                return res.status(200).json({
                    success: true,
                    id: item._id,
                    message: 'Item updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Item not updated!',
                })
            })
    })
}

// delete item

deleteItem = async (req, res) => {
    console.log("delete item")

    // find and delete item in data base
    await Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) {
            console.log("400 error: " + err);
            return res.status(400).json({ success: false, error: err })
        }

        // item not found
         if (!item) {
             console.log("404 error: " + 'Item not found');
             return res
               .status(404)
               .json({ success: false, error: `Item not found` })
        }

        // print deleted item details
        console.log(item)

        // return success
        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}

// get item by id

getItemById = async (req, res) => {

    console.log("get item by id")

    // find item by id
    await Item.findOne({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // item not found
        if (!item) {
            return res
                .status(404)
                .json({ success: false, error: `Item not found` })
        }

        // return success
        return res.status(200).json({ success: true, data: item })
    }).catch(err => console.log(err))
}

// return all items

getItems = async (req, res) => {

    console.log("get items");

    // get all items in table {}
    await Item.find({}, (err, items) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // no items in database
        if (!items.length) {
            return res
                .status(404)
                .json({ success: false, error: `no items available` })
        }

        // return sucess
        return res.status(200).json({ success: true, data: items })
    }).catch(err => console.log(err))
}

// export all item controller functions
module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getItems,
    getItemById,
}
