<?php
//donne les erreurs php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once '../modeles/config.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$typesDeBillets = $typesDeBilletsDB;
$chargementTarifsErreur = $typesDeBilletsErreur ?? null;
unset($typesDeBilletsErreur);

$messageErreur = $_SESSION['error'] ?? null;
unset($_SESSION['error']);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réservation — FA</title>
    <link rel="stylesheet" href="/style/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>

    <header class="hero-banner small-banner">
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
            <h1>Réserver vos billets pour le Site de Fâ</h1>
        </div>
    </header>

    <main class="container">
        <section class="section">
            <div class="container">
                <div class="reservation-form-container">
                    <h2 class="text-highlight">Choisissez votre date de visite et le nombre de billets souhaités.</h2>

                    <?php if (!empty($messageErreur)): ?>
                    <div class="alerte alerte-erreur">
                        <?php echo htmlspecialchars($messageErreur); ?>
                    </div>
                    <?php endif; ?>

                    <?php if (!empty($chargementTarifsErreur)): ?>
                    <div class="alerte alerte-erreur">
                        Les tarifs n'ont pas pu être chargés. Merci de réessayer plus tard.
                    </div>
                    <?php endif; ?>

                    <form action="/process-confirmation.php" method="POST" id="reservation-form">

                        <fieldset>
                            <legend class="legend-strong">1. Votre visite</legend>
                            <div class="field-row">
                                <label for="date_visite">Date de visite :</label>
                                <input type="date" id="date_visite" name="date_visite" required min="<?php echo date('Y-m-d'); ?>">
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend class="legend-strong">2. Vos billets</legend>
                            <?php if (!empty($typesDeBillets)): ?>
                            <?php foreach ($typesDeBillets as $type): ?>
                            <div class="ticket-type">
                                <div>
                                    <label for="billet_<?php echo htmlspecialchars($type->getId()); ?>">
                                        <?php echo htmlspecialchars($type->getLibelle()); ?>
                                        <span class="ticket-price">(<?php echo htmlspecialchars(number_format($type->getPrix(), 2, ',', ' ')); ?> €)</span>
                                    </label>
                                </div>
                                <div>
                                    <input type="number"
                                           id="billet_<?php echo htmlspecialchars($type->getId()); ?>"
                                           name="quantites[<?php echo htmlspecialchars($type->getId()); ?>]"
                                           class="ticket-quantity"
                                           min="0"
                                           value="0"
                                           data-prix="<?php echo htmlspecialchars(number_format($type->getPrix(), 2, '.', '')); ?>">
                                </div>
                            </div>
                            <?php endforeach; ?>
                            <?php else: ?>
                            <p class="alerte alerte-info">Aucun type de billet n'est disponible pour le moment.</p>
                            <?php endif; ?>
                        </fieldset>

                        <fieldset>
                            <legend class="legend-strong">3. Vos informations</legend>
                            <div class="field-row">
                                <label for="nom">Nom :</label>
                                <input type="text" id="nom" name="nom" placeholder="Votre nom" required>
                            </div>
                            <div class="field-row">
                                <label for="prenom">Prénom :</label>
                                <input type="text" id="prenom" name="prenom" placeholder="Votre prénom" required>
                            </div>
                            <div class="field-row">
                                <label for="email">Email :</label>
                                <input type="email" id="email" name="email" placeholder="exemple@domaine.com">
                                <small>Votre billet électronique sera envoyé à cette adresse (si vous ne renseignez pas de téléphone).</small>
                            </div>
                            <div class="field-row">
                                <label for="telephone">Téléphone :</label>
                                <input type="tel" id="telephone" name="telephone" placeholder="+33 6 12 34 56 78">
                                <small>Ou renseignez votre numéro de téléphone (si vous ne renseignez pas d'email).</small>
                            </div>
                            <p class="notice-warning">⚠ L'email ou le téléphone est obligatoire (au moins l'un des deux).</p>
                        </fieldset>

                        <div class="total-section">
                            <div class="total-right">
                                <h3>Total : <span id="total-price">0,00 €</span></h3>
                                <button type="submit" class="btn btn-orange">Valider et Payer (Simulation)</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
    </footer>

    <script src="/JS/script.js"></script>
    <script src="/JS/reservation.js"></script>
</body>
</html>