<?php
include_once 'BaseDeveloppeurDAO.php';
include_once '../configBdd.php';
$connexionDev = new BaseDeveloppeurDAO();
$lesDeveloppeurs = $connexionDev->getLesDeveloppeurs();
var_dump($lesDeveloppeurs);
