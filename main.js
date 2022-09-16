import express from 'express'
const app = express()
const port = 5000
const cors = require('cors')
const routes = require('./src/routes/routes')


app.use(cors())
app.use(express.json())
app.use('/',routes)
//app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
export default app