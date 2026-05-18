<?php
// Fichier: facture.php
session_start();

if (!isset($_SESSION['confirmation'])) {
    die("Aucune information de confirmation trouvée.");
}
$confirmation = $_SESSION['confirmation'];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture - Commande FA</title>
    <link rel="stylesheet" href="/style/style.css"> 
</head>
<body>
    
    <div class="facture-container">
        <img src="/images/logo.webp" alt="Logo Fa">
        <h1>Facture de réservation</h1>
        
        <div class="details">
            <h3>Client</h3>
            <p><?php echo htmlspecialchars($confirmation['prenom'] . ' ' . $confirmation['nom']); ?></p>
            <p><?php echo htmlspecialchars($confirmation['email']); ?></p>
        </div>
        
        <div class="details">
            <h3>Détails de la visite</h3>
            <p><strong>Date :</strong> <?php echo date('d/m/Y', strtotime(htmlspecialchars($confirmation['date_visite']))); ?></p>
        </div>
        
        <table class="facture-table"> <thead>
                <tr>
                    <th>Billet</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire</th>
                    <th>Sous-total</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($confirmation['billets'] as $billet): ?>
                <tr>
                    <td><?php echo htmlspecialchars($billet['libelle']); ?></td>
                    <td><?php echo htmlspecialchars($billet['quantite']); ?></td>
                    <td><?php echo number_format($billet['prix_unitaire'], 2, ',', ' '); ?> €</td>
                    <td><?php echo number_format($billet['quantite'] * $billet['prix_unitaire'], 2, ',', ' '); ?> €</td>
                </tr>
                <?php endforeach; ?>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="total-label">Montant Total Payé</td>
                    <td class="total-montant"><?php echo number_format($confirmation['total'], 2, ',', ' '); ?> €</td>
                </tr>
            </tfoot>
        </table>
    </div>

    <script>
        window.print();
    </script>
</body>
</html>