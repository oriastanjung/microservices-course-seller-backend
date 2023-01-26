const express = require("express");
const isBase64 = require("is-base64");
const router = express.Router();
const base64Img = require("base64-img");
const fs = require('fs');
const { Media } = require("../models");

router.get('/', async (req,res) => {
  const media = await Media.findAll({
    attributes : ['id','image']
  });

  const mappedMedia = media.map((item) => {
    item.image = `${req.get('host')}/${item.image}`
    return item
  })
  return res.json({
    status : "success",
    data : mappedMedia
  })
})

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  const data = await Media.findByPk(id, {
    attributes : ['id', 'image']
  });

  if(!data){
    return res.status(404).json({status : "error", message : `no such file with primary key ${id}`})
  }

  const result = data
  result.image = `${req.get('host')}/${result.image}`
  return res.json({
    status : "success",
    data : result
  })
})

router.post("/", (req, res) => {
  const { image } = req.body;
  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "invalid base64" });
  }
  base64Img.img(image, "./public/images", Date.now(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }

    // '/public/images/4124124141.png'
    // const filename = filepath.split('\\').pop().split("/").pop()    // for windows
    const filename = filepath.split("/").pop(); // for mac
    const media = await Media.create({
      image : `images/${filename}`
    })

    return res.json({
      status : "success",
      data : {
        id : media.id,
        image: `${req.get('host')}/images/${filename}`
      }
    })
  });
});



router.delete('/:id' , async (req,res) => {
  const {id} = req.params;

  const media = await Media.findByPk(id);

  if(!media){
    return res.status(404).json({
      status : "error",
      message : `img media with id - ${id} not found`
    })
  }
  
  fs.unlink(`./public/${media.image}`, async (err) => {
    if(err) {
      return res.status(404).json({
        status : "error",
        message : err.message
      })
    }

    await media.destroy();

    return res.json({
      status : "success",
      message : `image media with id - ${id} deleted`
    })
  })
})
module.exports = router;
