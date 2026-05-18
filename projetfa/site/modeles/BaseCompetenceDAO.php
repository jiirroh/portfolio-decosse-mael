<?php
// lien vers la classe mère
include_once "BaseDAO.php";
include_once "Competence.php";


class BaseCompetenceDAO extends BaseDAO
{
    public function __construct()
    {
        parent::__construct(); // par défaut la connexion n'est pas établie.
    }

    /**
     * Méthode permettant de définir la connexion
     * à la base de données
     * avec les habilitations les plus adéquates (droits restreints)
     * selon l'action à réaliser
     */
    private function setConnexionSelonRole(string $role)
    {
        $this->setConnexionBase($_ENV['local_dsn'], $_ENV[$role], $_ENV['pwd' . $role], $_ENV['options']);
    }

    public function getLesCompetences(): array
    {
        // connexion à la base de données avec des droits adéquats
        $this->setConnexionSelonRole("DevRead");
        // demande d'exécution de la requête fournie
        $requeteAExecuter = "SELECT * FROM Competence;";
        $resultatDeLaRequete = $this->query($requeteAExecuter);

        //extraction des données récupérées sous la forme d'un tableau associatif (PHP)
        $lesLignes = $resultatDeLaRequete->fetchAll();

        // transformation du tableau associatif en tableau d'objets
        $lesLignesObjets = [];

        foreach ($lesLignes as $ligne) {
            $lesLignesObjets[] = new Competence(
                (int)$ligne['id'],
                (string)$ligne['nom']
            );
        }

        // fermeture de la connexion à la base de données
        $resultatDeLaRequete = null;

        return $lesLignesObjets; // renvoi du tableau d'objets
    }

    public function supprimerComptetence(int $id): string
    {
        // connexion à la base de données avec des droits adéquats
        $this->setConnexionSelonRole("DevWrite");
        // demande d'exécution de la requête fournie
        $requeteAExecuter = "DELETE FROM Competence WHERE id = ".$id.";";
        $lesLignes = $this->query($requeteAExecuter);

        // Vérification du nombre de lignes affectées
        if ($lesLignes->rowCount() > 0) {
            $msg = "Le développeur avec l'ID $id a été supprimé.";
        } else {
            $msg = "Aucun développeur trouvé avec l'ID $id.";
        }

        // Fermeture de la connexion à la base de données
        $lesLignes = null;

        return $msg; // renvoi du tableau d'objets
    }
}