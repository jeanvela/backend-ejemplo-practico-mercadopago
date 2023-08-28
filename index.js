const app = require('./src/app.js')
const Port = 3001

app.listen(Port, () => {
    console.log(`%s listening at ${Port}`)
})