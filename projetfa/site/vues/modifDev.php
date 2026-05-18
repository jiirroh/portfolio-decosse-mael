<div id="illustration">
	<img id='picnic_equipe' src='images/Picnic_equipe.jpg' alt='SJP_Picnic_equipe' />
</div>
<div id="description">
	<h2> Formulaire de modification d'un développeur : </h2>

    <form action="index.php?controleur=developpeurs&action=aPropos&id=<?= $id ?>" method="post">
        <label for="nom">Nom: </label>
            <input type="text" name="nom" id="nom">
        <br>
        <label for="prenom">Prénom: </label>
            <input type="text" name="prenom" id="prenom">
        <br>
        <input type="submit" value="Valider">
    </form>

</div>