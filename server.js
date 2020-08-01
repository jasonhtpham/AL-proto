let express = require('express');
let app = express();

const PORT = process.env.port || 3000;

// serve static files
app.use(express.static(__dirname + '/public'));

app.get('/result', (req,res) => {
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let id = req.query.id;

    let result = {
        StudentID: id,
        FirstName: firstName,
        LastName: lastName
    }

    res.json(result);
})

app.listen(PORT, () => {
    console.log('Server is listening on port ', PORT);
})