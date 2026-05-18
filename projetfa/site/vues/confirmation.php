<?php
// Fichier: confirmation.php
session_start();

// Sécurité : si la session 'confirmation' n'existe pas, on renvoie à la réservation
if (!isset($_SESSION['confirmation'])) {
    header('Location: /vues/reservation.php');
    exit;
}

// On récupère les infos de la session
$confirmation = $_SESSION['confirmation'];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation — FA</title>
    <link rel="stylesheet" href="/style/style.css"> 
    
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
    </head>
<body>

    <header class="hero-banner small-banner">
        <!-- Carrousel -->
        <div class="carousel-images">
            <img src="/images/image1.webp" alt="Site Fa" class="carousel-image active">
            <img src="/images/image1.webp" alt="Site Fa" class="carousel-image">
            <img src="/images/image1.webp" alt="Site Fa" class="carousel-image">
        </div>
        
        <div class="overlay"></div>
        
        <div class="navbar-container">
            <div class="container">
                <nav class="navbar">
                    <div class="logo">
                        <a href="/index.php"><img src="/images/logo.webp" alt="Logo Fa" width="40"></a>
                    </div>
                    <ul class="nav-links">
                        <li><a href="/index.php">Accueil</a></li>
                    </ul>
                    <a href="/vues/reservation.php" class="btn btn-orange btn-small">Réserver</a>
                </nav>
            </div>
        </div>

        <div class="hero-content small-hero">
            <h1>Confirmation de votre réservation</h1>
        </div>
    </header>

    <main class="container">
        <section class="section">
            <div class="validation-container">
                <h2><i class="fas fa-check-circle"></i> Merci <?php echo htmlspecialchars($confirmation['prenom']); ?> !</h2>
                <p>Votre réservation est confirmée pour le <strong><?php echo date('d/m/Y', strtotime(htmlspecialchars($confirmation['date_visite']))); ?></strong>.</p>
                <?php if (!empty($confirmation['email'])): ?>
                <p>Un email (fictif) a été envoyé à <strong><?php echo htmlspecialchars($confirmation['email']); ?></strong>.</p>
                <?php endif; ?>
                <?php if (!empty($confirmation['telephone'])): ?>
                <p>Un SMS (fictif) a été envoyé au <strong><?php echo htmlspecialchars($confirmation['telephone']); ?></strong>.</p>
                <?php endif; ?>
                <hr>
                
                <h3>Votre récapitulatif</h3>

                <table class="facture-table">
                    <thead>
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
                            <td colspan="3" class="total-label">Montant Total</td>
                            <td class="total-montant"><?php echo number_format($confirmation['total'], 2, ',', ' '); ?> €</td>
                        </tr>
                    </tfoot>
                </table>

                <div class="actions-container">
                    <a href="/vues/facture.php" target="_blank" class="btn btn-orange actions-left">
                        <i class="fas fa-download"></i> Télécharger la facture
                    </a>
                    <a href="/index.php" class="btn btn-secondary actions-center">
                        <i class="fas fa-home"></i> Retour à l'accueil
                    </a>
                    <a href="/vues/reservation.php" class="btn btn-orange actions-right">
                        <i class="fas fa-ticket-alt"></i> Réserver à nouveau
                    </a>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
    </footer>

    <script src="/JS/script.js"></script>
</body>
</html>