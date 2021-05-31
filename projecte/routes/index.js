const path = require('path');

exports.index = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/html/index.html'));
}

exports.model = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/html/model.html'));
}

exports.model3D = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/html/model3d.html'));
}

exports.associacio = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/html/associacio.html'));
}

exports.camera = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/html/camera.html'));
}

exports.ajuda = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/html/ajuda.html'));
}

exports.jmodel = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/javascripts/model.js'));
}

exports.jmodel3D = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/javascripts/model3d.js'));
}

exports.jassociacio = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/javascripts/associacio.js'));
}

exports.jcamera = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/javascripts/camera.js'));
}

exports.cindex = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/stylesheets/index.css'));
}

exports.fons = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/images/fons.png'));
}

exports.logo = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/images/logo.png'));
}

exports.cub = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/images/cub.png'));
}

exports.esfera = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/images/esfera.png'));
}

exports.tetraedre = function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/images/tetraedre.png'));
}