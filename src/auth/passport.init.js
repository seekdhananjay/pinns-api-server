const User = require('./users.model');
const passport = require('passport')
const { Strategy: GithubStrategy} = require('passport-github')
const { 
  GITHUB_CONFIG
} = require('../config/index')

module.exports = () => {

  passport.serializeUser((user, cb) => {
    cb(null, user.userId)
  })

  passport.deserializeUser((userId, cb) => {
    User.findByUserId(userId, (err, user) => cb(err, user))
  })
  
  const createMongoUserObjectFromGithubProfile = (profile) => {
    return {
      userId: profile.id,
      userName: profile.username,
      userDisplayName: profile.displayName,
      userLoginProvider: profile.provider || 'github',
      userProfileUrl: profile.profileUrl,
      userProfileImageUrl: profile._json.avatar_url || profile.photos[0].value,
      userLocation: profile._json.location,
      userCompany: profile._json.company,
    };
  };

  const callback = async (accessToken, refreshToken, profile, cb) => {
    
    const newUser = createMongoUserObjectFromGithubProfile(profile);

    try {
      let user = await User.findOne({ userId: profile.id })

      if (user) {
        console.info('user already available', user);
        cb(null, user)
      } else {
        user = await User.create(newUser)
        console.info('user newly created', user);
        cb(null, user)
      }
    } catch (err) {
      console.error(err)
    }
  };
  
  passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
}