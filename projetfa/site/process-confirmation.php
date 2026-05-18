<?php
// Traitement du formulaire de réservation
session_start();

require_once __DIR__ . '/modeles/config.php';
require_once __DIR__ . '/modeles/ReservationDAO.php';
require_once __DIR__ . '/modeles/Reservation.php';
require_once __DIR__ . '/modeles/ReservationBillet.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /vues/reservation.php');
    exit;
}

$prenom = trim($_POST['prenom'] ?? '');
$nom = trim($_POST['nom'] ?? '');
$email = trim($_POST['email'] ?? '');
$telephone = trim($_POST['telephone'] ?? '');
$dateVisiteRaw = $_POST['date_visite'] ?? '';
$quantites = $_POST['quantites'] ?? [];

if ($prenom === '' || $nom === '' || $dateVisiteRaw === '') {
    $_SESSION['error'] = 'Merci de renseigner toutes les informations obligatoires.';
    header('Location: /vues/reservation.php');
    exit;
}

// Valider qu'au moins l'email ou le téléphone est rempli
if (empty($email) && empty($telephone)) {
    $_SESSION['error'] = 'Veuillez renseigner au moins une adresse email ou un numéro de téléphone.';
    header('Location: /vues/reservation.php');
    exit;
}

// Valider l'email s'il est rempli
if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['error'] = 'Adresse email invalide.';
    header('Location: /vues/reservation.php');
    exit;
}

$dateVisite = DateTimeImmutable::createFromFormat('Y-m-d', $dateVisiteRaw);
if ($dateVisite === false) {
    $_SESSION['error'] = 'Date de visite invalide.';
    header('Location: /vues/reservation.php');
    exit;
}

$typesParId = [];
foreach ($typesDeBilletsDB as $typeBillet) {
    $typesParId[$typeBillet->getId()] = $typeBillet;
}

$billetsSelectionnes = [];
$billetsConfirmation = [];

foreach ($quantites as $id => $quantiteSouhaitee) {
    $idType = (int)$id;
    $quantite = (int)$quantiteSouhaitee;
    if ($quantite <= 0) {
        continue;
    }

    if (!isset($typesParId[$idType])) {
        $_SESSION['error'] = 'Type de billet inconnu.';
        header('Location: /vues/reservation.php');
        exit;
    }

    $typeBillet = $typesParId[$idType];
    $billetsSelectionnes[] = new ReservationBillet($typeBillet->getId(), $quantite, $typeBillet->getPrix());
    $billetsConfirmation[] = [
        'id_type_billet' => $typeBillet->getId(),
        'libelle' => $typeBillet->getLibelle(),
        'quantite' => $quantite,
        'prix_unitaire' => $typeBillet->getPrix(),
    ];
}

if (empty($billetsSelectionnes)) {
    $_SESSION['error'] = 'Veuillez sélectionner au moins un billet.';
    header('Location: /vues/reservation.php');
    exit;
}

$reservation = new Reservation(null, $nom, $prenom, $email, $dateVisite, $billetsSelectionnes, $telephone ?: null);

try {
    $reservationDAO = new ReservationDAO();
    $reservationId = $reservationDAO->creerReservation($reservation);
} catch (Throwable $exception) {
    $_SESSION['error'] = 'Une erreur est survenue lors de l\'enregistrement de la réservation.';
    header('Location: /vues/reservation.php');
    exit;
}

$_SESSION['confirmation'] = [
    'reservation_id' => $reservationId,
    'prenom' => $prenom,
    'nom' => $nom,
    'email' => $email,
    'telephone' => $telephone,
    'date_visite' => $dateVisiteRaw,
    'billets' => $billetsConfirmation,
    'total' => $reservation->getTotal(),
];

header('Location: /vues/confirmation.php');
exit;
