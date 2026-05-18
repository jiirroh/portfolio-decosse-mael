<?php
require_once __DIR__ . '/BaseDAO.php';
require_once __DIR__ . '/Reservation.php';
require_once __DIR__ . '/ReservationBillet.php';

class ReservationDAO extends BaseDAO
{
    public function __construct()
    {
        parent::__construct();
    }

    private function setConnexionSelonRole(string $role): void
    {
        $this->setConnexionBase($_ENV['local_dsn'], $_ENV[$role], $_ENV['pwd' . $role], $_ENV['options']);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function creerReservation(Reservation $reservation): int
    {
        $this->setConnexionSelonRole('DevWrite');

        try {
            $this->db->beginTransaction();

            $requeteReservation = $this->db->prepare(
                'INSERT INTO Reservation (prenom, nom, email, telephone, date_visite, total) VALUES (:prenom, :nom, :email, :telephone, :date_visite, :total)'
            );
            $requeteReservation->execute([
                ':prenom' => $reservation->getPrenom(),
                ':nom' => $reservation->getNom(),
                ':email' => $reservation->getEmail(),
                ':telephone' => $reservation->getTelephone(),
                ':date_visite' => $reservation->getDateVisite()->format('Y-m-d'),
                ':total' => $reservation->getTotal(),
            ]);

            $reservationId = (int)$this->db->lastInsertId();

            $requeteBillet = $this->db->prepare(
                'INSERT INTO ReservationBillet (reservation_id, type_billet_id, quantite, prix_unitaire) VALUES (:reservation_id, :type_billet_id, :quantite, :prix_unitaire)'
            );

            foreach ($reservation->getBillets() as $billet) {
                if (!$billet instanceof ReservationBillet) {
                    continue;
                }

                $requeteBillet->execute([
                    ':reservation_id' => $reservationId,
                    ':type_billet_id' => $billet->getTypeBilletId(),
                    ':quantite' => $billet->getQuantite(),
                    ':prix_unitaire' => $billet->getPrixUnitaire(),
                ]);
            }

            $this->db->commit();

            $requeteReservation = null;
            $requeteBillet = null;

            return $reservationId;
        } catch (Throwable $exception) {
            $this->db->rollBack();
            throw $exception;
        }
    }
}
