// ordercontroller
// handles all item data base requests from client

// order table
const Order = require('../models/OrderModel')

// create item
createOrder = async (req, res) => {

    console.log("create order")

    // get info
    const body = req.body
    console.log(body);

    // validate info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a order',
        })
    }

    // make new order
    const order = new Order(body)
    console.log(order);
    console.log(body)

    // item created
    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    // save item in data base
    order
        .save()
        .then(() => {
            console.log("Order created");
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'Order created!',
            })
        })
        .catch(error => {
            console.log("Order not created!");
            return res.status(400).json({
                error,
                message: 'Order not created!',
            })
        })
}

// update order

updateOrder = async (req, res) => {

    console.log("update order")

    // get updated order info
    const body = req.body

    // validate order info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    // find order in data base
    Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Order not found!',
            })
        }

        // update existing order
        order.orderDate = body.orderDate
        order.itemOrdered = body.itemOrdered
        order.amount = body.amount
        order.orderStatus = body.orderStatus
        order.schedDelivery = body.schedDelivery
        order.address = body.address


        // update order in data base
        order
            .save()
            .then(() => {

                // return success
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'Order updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Order not updated!',
                })
            })
    })
}

// delete order

deleteOrder = async (req, res) => {
    console.log("delete order")

    // find and delete order in data base
    await Order.findOneAndDelete({ _id: req.params.id }, (err, order) => {
        if (err) {
            console.log("400 error: " + err);
            return res.status(400).json({ success: false, error: err })
        }

        // order not found
         if (!order) {
             console.log("404 error: " + 'Order not found');
             return res
               .status(404)
               .json({ success: false, error: `Order not found` })
        }

        // print deleted order details
        console.log(order)

        // return success
        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

// get order by id

getOrderById = async (req, res) => {

    console.log("get order by id")

    // find order by id
    await Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // order not found
        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }

        // return success
        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

// return all orders

getOrders = async (req, res) => {

    console.log("get orders");

    // get all orders in table {}
    await Order.find({}, (err, orders) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // no orders in database
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: `no orders available` })
        }

        // return sucess
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err))
}

// export all order controller functions
module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderById,
}
