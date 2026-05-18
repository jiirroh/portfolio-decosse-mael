<div id="illustration">
  <img id='picnic_equipe' src='images/Picnic_equipe.jpg' alt='SJP_Picnic_equipe' />
</div>
<div id="description">
  <h2> Liste des développeurs (source JSON) : </h2>
  <table border='1'>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prénom</th>
      </tr>
    </thead>
    <tbody>
<?php
if (!empty($lesDeveloppeurs)) {
    foreach ($lesDeveloppeurs as $dev) {
        $nom = isset($dev['nom']) ? htmlspecialchars($dev['nom']) : '';
        $prenom = isset($dev['prenom']) ? htmlspecialchars($dev['prenom']) : '';
        echo '<tr>';
        echo '<td>' . $nom . '</td>';
        echo '<td>' . $prenom . '</td>';
        echo '</tr>';
    }
} else {
    echo '<tr><td colspan="2">Aucun développeur trouvé dans le JSON.</td></tr>';
}
?>
    </tbody>
  </table>
</div>
