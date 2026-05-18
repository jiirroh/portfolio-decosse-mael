<?php
require_once __DIR__ . '/../configBdd.php';
require_once __DIR__ . '/TypeBilletDAO.php';

try {
    $typeBilletDAO = new TypeBilletDAO();
    $typesDeBilletsDB = $typeBilletDAO->getTous();
} catch (Throwable $exception) {
    $typesDeBilletsDB = [];
    $typesDeBilletsErreur = $exception->getMessage();
}