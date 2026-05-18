<?php

class Reservation
{
    private ?int $id;
    private string $nom;
    private string $prenom;
    private string $email;
    private ?string $telephone;
    private DateTimeImmutable $dateVisite;
    /** @var ReservationBillet[] */
    private array $billets;
    private float $total;

    public function __construct(?int $id, string $nom, string $prenom, string $email, DateTimeImmutable $dateVisite, array $billets, ?string $telephone = null)
    {
        $this->id = $id;
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->email = $email;
        $this->telephone = $telephone;
        $this->dateVisite = $dateVisite;
        $this->billets = $billets;
        $this->total = $this->calculerTotal();
    }

    private function calculerTotal(): float
    {
        $total = 0.0;
        foreach ($this->billets as $billet) {
            if (!$billet instanceof ReservationBillet) {
                continue;
            }
            $total += $billet->getQuantite() * $billet->getPrixUnitaire();
        }
        return $total;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): string
    {
        return $this->nom;
    }

    public function getPrenom(): string
    {
        return $this->prenom;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function getDateVisite(): DateTimeImmutable
    {
        return $this->dateVisite;
    }

    /**
     * @return ReservationBillet[]
     */
    public function getBillets(): array
    {
        return $this->billets;
    }

    public function getTotal(): float
    {
        return $this->total;
    }
}
