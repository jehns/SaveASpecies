const router = require('express').Router()
const {OrderLine, Order} = require('../db/models')
const db = require('../db')
module.exports = router

router.get('/', (req, res, next) => {
  try {
    const cart = Order.findOne({
      where: {
        isPurchased: false,
        userId: req.user.Id
      },
      include: [
        {
          model: OrderLine
        }
      ]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/orderline', async (req, res, next) => {
  try {
    const orderLine = await OrderLine.create(req.body)
    res.json(orderLine)
  } catch (err) {
    next(err)
  }
})

router.get('/order/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params

    // const orders = await Order.findAll({where: {userId}})
    const [orderLines] = await db.query(
      `SELECT * FROM "orders" o LEFT JOIN "orderLines" l ON o."id" = l."orderId" WHERE o."userId" = ${userId}`
    )

    res.json(orderLines)
  } catch (err) {
    next(err)
  }
})

router.post('/order', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Order.update(
      {
        isPurchased: true,
        totalAmount: req.body.totalAmount
      },
      {
        where: {
          userId: req.body.userId,
          isPurchased: false
        }
      }
    )
    res.send(affectedRows)
  } catch (err) {
    next(err)
  }
})
