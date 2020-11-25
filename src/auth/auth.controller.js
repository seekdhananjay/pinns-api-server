exports.github = (req, res) => {
  const io = req.app.get('io')
  const user = {
    name: req.user.userDisplayName,
    location: req.user.userLocation,
    photo: req.user.userProfileImageUrl,
    userId: req.user.userId
  };
  
  io.in(req.session.socketId).emit('github', user)
  res.end()
} 