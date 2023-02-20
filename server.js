const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')

const port = process.env.PORT || 4000;


// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

app.use(middlewares);

const rules = auth.rewriter({
    '/api/*': '/$1',
    // Permission rules
    users: 600,
    messages: 664,
    secrets: 660,
  })

// You must apply the auth middleware before the router
app.use(rules)
app.use(auth)
app.use(router)
app.listen(port, () => {
    console.log("Server is ready for requests on port " + port)
})

module.exports = app