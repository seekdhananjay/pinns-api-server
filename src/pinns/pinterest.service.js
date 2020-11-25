const express = require('express')
const Image = require('./images.model')
const Projection = require('./projection')
const mongoose = require('mongoose');

const getImagesByUserIdQuery = (userId) => {
  return {
    "userId" : userId
  }
}

exports.getAllImagesByUserId = async (userId) => {
  const query = getImagesByUserIdQuery(userId);
  const allImages = await Image.find(query, Projection.image);
  
  return allImages;
};

exports.getAllImages = async () => {
  const allImages = await Image.find({}, Projection.image);
  return allImages;
};

exports.deleteImageById = async (userId, imageId) => {
  const _id = mongoose.mongo.ObjectId(imageId);
  const deletedId = await Image.findByIdAndDelete(_id);
  return deletedId;
}