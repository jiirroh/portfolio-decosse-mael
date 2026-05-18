<?php
include_once 'modeles/BaseDeveloppeurDAO.php';
include_once 'modeles/Developpeur.php';
include_once 'modeles/DeveloppeurJsonDAO.php';
include_once 'configBdd.php';

if (isset($_GET['action']))
    $action = filter_var($_GET['action'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
else
    $action = "aPropos";


switch ($action) {
    case 'aPropos':
        // A propos maintenant depuis la base de données
        $connexionBDDev = new BaseDeveloppeurDAO();
        if (isset($_GET['id']) && isset($_POST['nom']) && isset($_POST['prenom'])) {
            $id = (int) $_GET['id'];
            $nom = $_POST['nom'];
            $prenom = $_POST['prenom'];
            $connexionBDDev->modifierDeveloppeur($id, $nom, $prenom);
        } else if (isset($_GET['id'])) {
            $id = (int) $_GET['id'];
            $connexionBDDev->supprimerDeveloppeur($id);
        }
        if (isset($_GET['recherche'])) {
            $termeRecherche = filter_var($_GET['recherche'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $lesDeveloppeurs = $connexionBDDev->rechercherDeveloppeurs($termeRecherche);
        } else {
            $lesDeveloppeurs = $connexionBDDev->getLesDeveloppeurs();
            $termeRecherche = '';
        }
        include_once 'vues/apropos.php';
        break;
    case 'json':
        // Nouvelle page dédiée pour afficher depuis le JSON
        $daoJson = new DeveloppeurJsonDAO();
        $lesDeveloppeurs = $daoJson->getLesDeveloppeurs();
        include_once 'vues/apropos_json.php';
        break;
    case 'ajout':
        $connexionBDDev = new BaseDeveloppeurDAO();
        if(isset($_POST['nom']) && isset($_POST['prenom'])){
            $nom = $_POST['nom'];
            $prenom = $_POST['prenom'];
            $ajoutDeveloppeur = $connexionBDDev->ajouterDeveloppeur($nom, $prenom);
        }
        include_once 'vues/ajoutDev.php';
        break;
    case 'modifier':
        if(isset($_GET['id'])){
            $id = $_GET['id'];
        }
        include_once 'vues/modifDev.php';
        break;
}
