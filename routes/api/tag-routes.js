const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }]
    })
    if (!allTags) {
      res.status(404).json({ message: `Database is empty!` })
      return
    }
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!singleTag) {
      res.status(404).json({ message: `Tag does not exist in the database!` })
      return
    }
    res.status(200).json(singleTag)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body)
    res.status(200).json({ message: `Success! Tag was created in the database.` })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const editTag = await Tag.update(req.body,
      {
        where: { id: req.params.id }
      }
    )
    if (!editTag) {
      res.status(404).json({ message: `Tag does not exist in the database!` })
      return
    }
    res.status(200).json({ message: `Success! Tag was edited in the database.` })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroyTag = await Tag.destroy({
      where: { id: req.params.id }
    })
    if (!destroyTag) {
      res.status(404).json({ message: `Tag does not exist in the database!` })
      return
    }
    res.status(200).json({ message: `Tag was removed from the database!` })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router