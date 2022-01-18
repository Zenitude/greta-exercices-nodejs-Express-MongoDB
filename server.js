const express = require('express');
const cors = require('cors');

const app = express();

let corsOptions = 
{
    origin: "http:localhost:8081"
}

app.use(cors(corsOptions));

// Analyser les requêtes Content-Type, application/json
app.use(express.json());

// Analyser les demandes Content-Type, application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Connection à mongoose
const db = require("./models");

db.mongoose
    .connect(db.url, 
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => { console.log("Connecté à la base de données !"); })
    .catch(err => 
    {
        console.log("Impossible de se connecter à la base de données !", err);
        process.exit();
    })

// Route simple
app.get('/', (request, response) => 
{
    response.json({message: "Bienvenue à l'application Rudy."});
});

require("./routes/tutorial-routes");

// Définir le port, écouter les requêtes
const port = process.env.PORT || 8080;

app.listen(port, () =>
{
    console.log(`Server en ligne sur le port http://localhost:${port}`);
})