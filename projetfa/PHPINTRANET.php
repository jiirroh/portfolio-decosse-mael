<html>
<head>
</head>
<h1>Nos produits en stock pour le restaurant</h1>
<?php
try {
    $laconnexion = new PDO('mysql:host=localhost;dbname=RESTAURANT', 'toto', 'toto');
} catch (PDOException $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
}
$ordresql = ("SELECT * from STOCKS");
$rsql = $laconnexion->query($ordresql) or die ('Erreur requete');
$lesTuples = $rsql->fetchAll();
foreach($lesTuples as $leTuple){
    echo $leTuple["Designation"], "&nbsp;&nbsp;&nbsp;";
    echo $leTuple["Poids"];
    echo "&nbsp;&nbsp;", $leTuple["NombreUnites"];
    ?><br/><?php
};
?>
</html>
