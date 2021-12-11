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
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findAll({
      where: { id: req.params.id },
      include: [{ model: Product }]
    })
    if (!singleTag) {
      res.status(404).json({ message: `${singleTag} does not exist in the database!` })
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
    res.status(200).json(createTag)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const editTag = await Tag.update(req.body,
      {
        where: { id: req.params.id }
      }
    )
    if (!editTag) {
      res.status(404).json({ message: `${editTag} does not exist in the database!` })
      return
    }
    res.status(200).json(editTag)
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
      res.status(404).json({ message: `${destroyTag} does not exist in the database!` })
      return
    }
    res.status(200).json(destroyTag)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router