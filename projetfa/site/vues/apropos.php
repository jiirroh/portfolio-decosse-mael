<div id="illustration">
	<img id='picnic_equipe' src='images/Picnic_equipe.jpg' alt='SJP_Picnic_equipe' />
</div>
<div id="description">
	<h2> L'équipe ayant créé cette application est composée de : </h2>
	<form method="get" action="index.php" class="form-search">
		<input type="hidden" name="controleur" value="developpeurs" />
		<input type="hidden" name="action" value="aPropos" />
		<input type="text" name="recherche" placeholder="Rechercher (nom ou prénom)" value="<?php echo isset($termeRecherche)?htmlspecialchars($termeRecherche):''; ?>" />
		<button type="submit">Rechercher</button>
		<?php if (!empty($termeRecherche)) { echo '<a href="index.php?controleur=developpeurs&action=aPropos" class="link-reset">Réinitialiser</a>'; } ?>
	</form>
	<?php if (isset($termeRecherche) && $termeRecherche !== '') { echo '<p><em>Résultats pour : '.htmlspecialchars($termeRecherche).'</em></p>'; } ?>
	<table border='1'>
		<thead>
			<tr>
				<th>Nom</th>
				<th>Prénom</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<?php
			if (empty($lesDeveloppeurs)) {
				echo '<tr><td colspan="3">Aucun développeur trouvé.</td></tr>';
			} else {
			foreach ($lesDeveloppeurs as $developpeur) {
				// $developpeur est un objet Developpeur provenant de la BDD
				echo '<tr>';
				echo '<td>' . htmlspecialchars($developpeur->getNom()) . '</td>';
				echo '<td>' . htmlspecialchars($developpeur->getPrenom()) . '</td>';
				echo '<td><a href="index.php?controleur=developpeurs&action=aPropos&id=' . $developpeur->getId() . '">Supprimer</a> ';
				echo '<a href="index.php?controleur=developpeurs&action=modifier&id=' . $developpeur->getId() . '">Modifier</a></td>';
				echo '</tr>';
			}
			}
			?>
		</tbody>
	</table>

</div>