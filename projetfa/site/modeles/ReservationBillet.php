<?php

class ReservationBillet
{
    private int $typeBilletId;
    private int $quantite;
    private float $prixUnitaire;

    public function __construct(int $typeBilletId, int $quantite, float $prixUnitaire)
    {
        $this->typeBilletId = $typeBilletId;
        $this->quantite = $quantite;
        $this->prixUnitaire = $prixUnitaire;
    }

    public function getTypeBilletId(): int
    {
        return $this->typeBilletId;
    }

    public function getQuantite(): int
    {
        return $this->quantite;
    }

    public function getPrixUnitaire(): float
    {
        return $this->prixUnitaire;
    }
}
