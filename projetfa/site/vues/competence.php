<div id="illustration">
	<img id='picnic_equipe' src='images/Picnic_equipe.jpg' alt='SJP_Picnic_equipe' />
</div>
<div id="description">
	<h2> Les compétences sont : </h2>
    <table border='1'>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($lesCompetences as $comps) {
                echo '<tr>';
                echo '<td>' . htmlspecialchars($comps->getNom()) . '</td>';
                echo '<td><a href="index.php?controleur=competences&action=competence&id='.$comps->getId().'">Supprimer</a></td>';
                echo '</tr>';
            }
            ?>
        </tbody>
    </table>

</div>