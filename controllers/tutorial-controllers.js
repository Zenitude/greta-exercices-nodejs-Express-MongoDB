const db = require("../models");

const tutorial = db.tutorial;

// Créer et enregistrer un nouveau tutoriel
exports.create = (request, response) => 
{
    // Valider la demande
    if(!request.body.title)
    {
        response.status(400).send({message: "Le contenu ne peut pas être vide !"});
        return;
    }

    // Créer un tutoriel
    const tutorial = new tutorial(
    {
        title: request.body.title,
        description: request.body.description,
        published: request.body.publie ? request.body.published : false
    })

    // Sauvegarder le tutoriel dans la base de données
    tutorial
        .save(tutorial)
        .then(donnees => 
        {
            response.send(donnees);
        })
        .catch(err =>
        {
            response.status(500).send(
            {
                message: err.message || "Une erreur s'est produite lors de la création du tutoriel."
            });
        });
};

// Récupérer tous les tutoriels de la base de données
exports.findAll = (request, response) => 
{
    const title = request.body.title;

    let condition = title ? { title : { $regex : new RegExp(title), $option: "i" }} : {}

    tutorial.find(condition)
    .then(donnees =>
    {
        response.send(donnees);
    })
    .catch(err =>
    {
        response.status(500).send(
        {
            message: err.message || "Une erreur s'est produite lors de la récupération du tutoriel."
        });
    });

};

// Trouver un seul tutoriel avec un id
exports.findOne = (request, response) => 
{
    const id = request.params.id;

    tutorial.findById(id)
    .then(donnees =>
    {
        if(!donnees)
        {
            response.status(404).send({message: "Tutoriel non trouvé avec l'id"+id});
        }
        else
        {
            response.send(donnees);
        }
    })
    .catch(err =>
    {
        response
            .status(500)
            .send({message: "Problème pour retrouver le tutoriel avec l'id"+id});
    });
};

// Mise à jour d'un tutoriel par l'id dans la requête
exports.update = (request, response) => 
{
    if(!request.body)
    {
        return response.status(400).send({ message: "Les données à mettre à jour ne peuvent pas être vides !"});
    }

    const id = request.params.id;

    tutorial.findByIdAndUpdate(id, request.body, {useFindAndModify: false})
        .then(donnees =>
        {
            if(!donnees)
            {
                response.status(404).send({message: `Impossible de mettre à jour le tutoriel avec id=${id}. Peut-être que le tutoriel n'a pas été trouvé !`});
            }
            else
            {
                response.send({message: "Tutoriel a été mise à jour avec succès !"});
            }
        })
        .catch(err =>
        {
            response.status(500).send({message: "Mise à jour du tutoriel avec id="+id});
        });
};

// Supprimer un tutoriel avec l'id spécifié dans la requête
exports.delete = (request, response) => 
{
    const id = request.params.id;

    tutorial.findByIdAndRemove(id)
        .then(donnees =>
        {
            if(!donnees)
            {
                response.status(404).send({message: `Ìmpossible de supprimer le tutoriel avec l'id=${id}. Peut-être que le tutoriel n'a pas été trouvé !`});
            }
            else
            {
                response.send({message: "Le tutoriel a été supprimé avec succès !"});
            }
        })
        .catch(err =>
        {
            response.status(500).send({message: "Impossible de supprimer le tutoriel avec id="+id});
        })
};

// Supprimer tous les tutoriels publiés
exports.deleteAll = (request, response) => 
{
    tutorial.deleteMany({})
        .then(donnees =>
        {
            response.send({message: `${donnees.deletedCount} Les tutoriels ont été supprimés avec succès.`})
        })
        .catch(err =>
        {
            response.status(500).send({message: err.message || "Une erreur s'est produite lors de la suppression de tous les tutoriels."});
        })
};

// Trouver tous les tutoriels publiés
exports.findAllPublished = (request, response) => 
{
    tutorial.find({publie: true})
        .then(donnees =>
        {
            response.send(donnees);
        })
        .catch(err =>
        {
            response.status(500).send({message: err.message || "Une erreur s'est produite lors de la récupération de tutoriels."})
        })
};

