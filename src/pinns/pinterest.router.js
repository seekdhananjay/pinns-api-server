const express = require('express')
const router = express.Router()
const pinterestController = require('./pinterest.controller')

router.get('/users',  pinterestController.pinterestUsers)
router.get('/users/:userId',  pinterestController.pinterestUserByUserId)

router
    .get('/users/:userId/images',  pinterestController.pinterestUserImagesByUserId)
    .post('/users/:userId/images',  pinterestController.pinterestSaveUserImageByUserId)
router
    .get('/users/:userId/images/:imageId',  pinterestController.pinterestUserImageByUserIdAndImageId)
    .delete('/users/:userId/images/:imageId',  pinterestController.pinterestDeleteImageById)

router.get('/images', pinterestController.pinterestImages);
router.get('/images/:imageId', pinterestController.pinterestImageByImageId);

module.exports = router