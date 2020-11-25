const HttpStatus = require('http-status');
const PinService = require('./pinterest.service');
const Image = require('./images.model');

exports.pinterestImages = async (req, res) => {
  const images = await PinService.getAllImages();
  res
    .set('API_CREATOR', `DHANANJAY`)
    .status(HttpStatus.OK)
    .send({
      data: images
    });
};

exports.pinterestSaveUserImageByUserId = async (req, res) => {
  const {userId} = req.params;
  console.info('userId, req.body: ', userId, req.body)
  const newImage = {
    name: req.body.imageName,
    link: req.body.imageURL,
    description: req.body.imageDescription,
    userId: req.params.userId
  };
  try{
    const imageResponse = await Image.create(newImage)
    res
      .set('API_CREATOR', `DHANANJAY`)
      .status(HttpStatus.CREATED)
      .send(imageResponse);
  }catch(error){
    console.info('Image create Error: '. error);
    res.send(error);
  }
  
};
exports.pinterestUserImagesByUserId = async (req, res) => {
  const {userId} = req.params;
  let images = [];
  if(userId !== 'null'){
    images = await PinService.getAllImagesByUserId(userId);
  } else {
    images = await PinService.getAllImages();
  }  
  res
    .set('API_CREATOR', `DHANANJAY`)
    .status(HttpStatus.OK)
    .send({
      data: images
    });
};

exports.pinterestUsers = async (req, res) => {
  const users = [];
  res
    .set('API_CREATOR', `DHANANJAY`)
    .status(HttpStatus.OK)
    .send({
      data: users
    });
};
exports.pinterestUserByUserId = async (req, res) => {
  const user = {};
  res
    .set('API_CREATOR', `DHANANJAY`)
    .status(HttpStatus.OK)
    .send({
      data: user
    });
};
exports.pinterestUserImageByUserIdAndImageId = async (req, res) => {
  const image = {};
  res
    .set('API_CREATOR', `DHANANJAY`)
    .status(HttpStatus.OK)
    .send({
      data: image
    });
};
exports.pinterestDeleteImageById = async (req, res) => {
  const {userId, imageId} = req.params;
  const deletedId = await PinService.deleteImageById(userId, imageId);
  res
    .set('API_CREATOR', `DHANANJAY`)
    .status(HttpStatus.OK)
    .send({
      data: deletedId
    });
};

exports.pinterestImageByImageId = async (req, res) => {
  const image = {};
  res
    .set('API_CREATOR', `DHANANJAY`)
    .status(HttpStatus.OK)
    .send({
      data: image
 
 
    });
};
