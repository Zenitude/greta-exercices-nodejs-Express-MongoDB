module.exports = app =>
{
    const tutorial = require("../controllers/tutorial-controllers");

    let router = require("express").Router();

    // Créer un nouveau tutoriel
    router.post("/", tutorial.create);

    // Récupérer tous les tutoriels
    router.get("/", tutorial.findAll);

    // Récupérer tous les tutoriels publiés
    router.get("/publies", tutorial.findAllPublished);

    // Récupérer un seul tutoriel avec l'id
    router.get("/:id", tutorial.findOne);

    // Supprimer un tutoriel avec l'id
    router.delete("/:id", tutorial.delete);

    // Supprimer tous les tutoriels
    router.delete("/", tutorial.deleteAll);

    app.use('/api/tutorials', router);
    
}
