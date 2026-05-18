<?php

/**
 * Modifications :
 * - Passage des attributs et méthodes de la classe Base en visibilité protected (utilisable que par la classe fille)
 */


class BaseDAO
{
    /**
     *
     * @var PDO $db : connexion à la base de données
     */
    protected PDO $db;

    /**
     * Constructeur de la classe sans paramètre
     */
    protected function __construct()
    {
        // par défaut la connexion n'est pas établie.

    }

    /**
     * Méthode de création d'une connexion à la base grâce aux 4 paramètres
     * @param string $dsn : serveur de base de données
     * @param string $user : nom d'utilisateur
     * @param string $mdp : mot de passe
     * @param array $options : options de connexion
     */
    protected function setConnexionBase(string $dsn, string $user, string $mdp, array $options)
    {
        try {
            $this->db = new PDO($dsn, $user, $mdp, $options);
        } catch (PDOException $erreur) {
            die('Erreur de connexion à la base de données ' . $erreur->getMessage());
        }
    }

    /**
     * methode publique définie pour pouvoir accéder à la méthode query() de la propriété $db qui est privée.
     */
    protected function query(string $sql)
    {
        return $this->db->query($sql);
    }

    /**
     * Méthode utilitaire pour échapper correctement une valeur (préparation simple)
     * @param string $val
     * @return string valeur entre quotes prêtes pour injection dans une requête
     */
    protected function quote(string $val): string
    {
        return $this->db->quote($val);
    }
}
