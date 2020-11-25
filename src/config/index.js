const providers = ['github']

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `https://pinns-api-server.herokuapp.com/${provider}/callback`
    : `https://localhost:8080/${provider}/callback`
})

const [githubURL] = callbacks

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? 'https://pinns-ui-app.netlify.com'
  : ['https://127.0.0.1:3000', 'https://localhost:3000']

exports.GITHUB_CONFIG = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: githubURL
}