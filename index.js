const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({bye: 'buddy'});
});

const PORT = process.env.PORT || 5000; //byDefault
app.listen(PORT); //localhost:5000
