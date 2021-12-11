const router = require('express').Router()
const { Category, Product } = require('../../models')

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = await Category.findAll({
      where: {
        id: req.params.id
      },
      include: [{ model: Product }]
    })

    if (!singleCategory) {
      res.status(404).json({ message: `${singleCategory} does not exist in the database!` })
      return
    }

    res.status(200).json(singleCategory)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body)
    res.status(200).json(createCategory)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const editCategory = await Category.update(req.body,
      {
        where: { id: req.params.id }
      }
    )

    if (!editCategory) {
      res.status(404).json({ message: `${editCategory} does not exist in the database!` })
      return
    }

    res.status(200).json(editCategory)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyCategory = await Category.destroy(
      {
        where: { id: req.params.id }
      }
    )

    if (!destroyCategory) {
      res.status(404).json({ message: `${destroyCategory} does not exist in the database!` })
      return
    }

    res.status(200).json(`${destroyCategory} was removed from the database!`)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router