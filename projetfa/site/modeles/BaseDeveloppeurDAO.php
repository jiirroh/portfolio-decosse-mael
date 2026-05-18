<?php
// lien vers la classe mère
include_once "BaseDAO.php";
include_once "Developpeur.php";

/**
 * Modifications :
 * - création d'une classe spécifique pour chaque table de la base de données
 * - modification du constructeur : instruction de connexion enlevée
 * - réalisation de la connexion en décalé afin de pouvoir
 *   définir un accès spécifique selon le type d'opération à réaliser
 */

class BaseDeveloppeurDAO extends BaseDAO
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

    // Nouvelle méthode créée à l'intérieur du modèle
    // pour rendre l'application plus modulaire

    /**
     * Fonction qui permet de récupérer les informations relatives aux développeurs
     * @return array $lesLignes
     */
    public function getLesDeveloppeurs(): array
    {
        // connexion à la base de données avec des droits adéquats
        $this->setConnexionSelonRole("DevRead");
        // demande d'exécution de la requête fournie
        $requeteAExecuter = "SELECT * FROM Developpeur;";
        $resultatDeLaRequete = $this->query($requeteAExecuter);

        //extraction des données récupérées sous la forme d'un tableau associatif (PHP)
        $lesLignes = $resultatDeLaRequete->fetchAll();

        // transformation du tableau associatif en tableau d'objets
        $lesLignesObjets = [];

        foreach ($lesLignes as $ligne) {
            $lesLignesObjets[] = new Developpeur(
                (int)$ligne['id'],
                (string)$ligne['nom'],
                (string)$ligne['prenom']
            );
        }

        // fermeture de la connexion à la base de données
        $resultatDeLaRequete = null;

        return $lesLignesObjets; // renvoi du tableau d'objets
    }

    /**
     * Recherche les développeurs par nom ou prénom (recherche partielle, insensible à la casse selon collation)
     * @param string $terme
     * @return Developpeur[]
     */
    public function rechercherDeveloppeurs(string $terme): array
    {
        $terme = trim($terme);
        if ($terme === '') {
            return $this->getLesDeveloppeurs();
        }
        $this->setConnexionSelonRole("DevRead");
        // protection rudimentaire des caractères spéciaux LIKE
        $pattern = '%' . str_replace(['%', '_'], ['\\%', '\\_'], $terme) . '%';
        $patternQuoted = $this->quote($pattern);
        $sql = "SELECT * FROM Developpeur WHERE nom LIKE $patternQuoted OR prenom LIKE $patternQuoted;";
        $resultat = $this->query($sql);
        $lignes = $resultat->fetchAll();
        $resultat = null;
        $objets = [];
        foreach ($lignes as $ligne) {
            $objets[] = new Developpeur((int)$ligne['id'], (string)$ligne['nom'], (string)$ligne['prenom']);
        }
        return $objets;
    }

        /**
     * Procédur qui permet de supprimer un développeur
     */
    public function supprimerDeveloppeur(int $id): void
    {
        // connexion à la base de données avec des droits adéquats
        $this->setConnexionSelonRole("DevWrite");
        // demande d'exécution de la requête fournie
        $requeteAExecuter = "DELETE FROM Developpeur WHERE id = ".$id.";";
        $this->query($requeteAExecuter);
        // rien à retourner ; la connexion sera fermée en fin de script
    }

    public function ajouterDeveloppeur(string $nom, string $prenom): string
    {
        // connexion à la base de données avec des droits adéquats
        $this->setConnexionSelonRole("DevWrite");
        // demande d'exécution de la requête fournie
        $requeteAExecuter = "INSERT INTO Developpeur(nom, prenom) VALUES('".$nom."', '".$prenom."');";
        $lesLignes = $this->query($requeteAExecuter);

        // Vérifier si l'insertion a réussi
        if ($lesLignes->rowCount() > 0) {
           $msg = "Le développeur a été ajouté avec succès.";
        } else {
            $msg =  "Erreur lors de l'ajout du développeur.";
        }

        // Fermeture de la connexion à la base de données
        $lesLignes = null;

        return $msg;
    }

    public function modifierDeveloppeur(int $id, string $nom, string $prenom): void
    {
        // connexion à la base de données avec des droits adéquats
        $this->setConnexionSelonRole("DevWrite");
        // demande d'exécution de la requête fournie
        $requeteAExecuter = "UPDATE Developpeur SET nom = '".$nom."', prenom = '".$prenom."' WHERE id = '".$id."';";
        $this->query($requeteAExecuter);
    }
}
