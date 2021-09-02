const express = require('express')
const cors = require('cors')
const app = express()

const jsonParser = express.json();

var arr = [ {'id':Math.random(), "title":'one', "results":[] } ]

const start = async () => {

    app.use(cors())

    try {
        //first send 
        app.get('/api/', function(req, res) {
            try {
                res.send(arr) // response post
            } catch (error) {
                console.log(error);
            }
        })
        //post dashboard 
        app.post('/api/', jsonParser, function(req, res) {
            try {
                arr.push(req.body) // push post in array
                res.send(arr) // response posts for front side
            } catch (error) {
                console.log(error);
            }
        })
        // post items in post
        app.post('/api/sub', jsonParser, function(req, res) {
            try {
                // looking post
                const nan = arr.map( el => {
                    if(el.title === req.body.board) {
                        return el
                    }
                })
                // cleaning array
                const filtered = nan.filter( el => {
                    return el != null
                })
                //JSON.stringify({'title':req.body.subTitle, 'postDate':req.body.postDate})
                filtered[0].results.push( req.body ) // JSON.stringify // push item in post
                res.send(arr) // response posts for front side
            } catch (error) {
                console.log(error);
            }
        })
        // delete post
        app.delete('/api/:id', jsonParser, function(req, res) {
            try {
                arr = arr.filter( item => item.id !== Number(req.params.id) ) // 
                res.send(arr)
            } catch (error) {
                console.log(error);
            }
        })
        // delete item from post
        app.delete('/api/sub/:item/:el', jsonParser, function(req, res) {
            try {
                // looking post from which Will be delete items           
                const nan = arr.map( el => {
                    if(el.title === req.params.item) {
                        return el
                    }
                })
                // cleaning array
                const filtered = nan.filter( el => {
                    return el != null
                })
                // cleaning array from post
                let ffd = filtered[0].results.filter( item => item.subTitle !== req.params.el )
                // join the cleared array to post
                filtered[0].results = ffd
                res.send(arr)
            } catch (error) {
                console.log(error);
            }
        })

        app.put('/api/', jsonParser, function (req, res) {
            try {
                arr = req.body // put change array in arr
                res.send(arr) // response posts for front side
            } catch (error) {
                console.log(error);
            }
        }); 

        app.listen( process.env.PORT  || 5000);

    } catch (error) {
        console.log(error)
    }
}

start()

// app.delete('/api/sub/:item/:el', jsonParser, function(req, res) {
//     // looking post from which Will be delete items           
//     const nan = arr.map( el => {
//         if(el.title === req.params.item) {
//             return el
//         }
//     })
//     // cleaning array
//     const filtered = nan.filter( el => {
//         return el != null
//     })
//     // cleaning array from post
//     let ffd = filtered[0].results.filter( item => item.subTitle !== req.params.el )
//     // join the cleared array to post
//     filtered[0].results = ffd
//     res.send(arr)
// })