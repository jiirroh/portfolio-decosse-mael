<?php
require_once __DIR__ . '/BaseDAO.php';
require_once __DIR__ . '/TypeBillet.php';

class TypeBilletDAO extends BaseDAO
{
    public function __construct()
    {
        parent::__construct();
    }

    private function setConnexionSelonRole(string $role): void
    {
        $this->setConnexionBase($_ENV['local_dsn'], $_ENV[$role], $_ENV['pwd' . $role], $_ENV['options']);
    }

    /**
     * @return TypeBillet[]
     */
    public function getTous(): array
    {
        $this->setConnexionSelonRole('DevRead');
        $sql = 'SELECT id, libelle, prix FROM TypeBillet ORDER BY id;';
        $resultat = $this->query($sql);
        $lignes = $resultat->fetchAll();
        $resultat = null;

        $types = [];
        foreach ($lignes as $ligne) {
            $types[] = new TypeBillet((int)$ligne['id'], (string)$ligne['libelle'], (float)$ligne['prix']);
        }

        return $types;
    }

    public function findById(int $id): ?TypeBillet
    {
        $this->setConnexionSelonRole('DevRead');
        $requete = $this->db->prepare('SELECT id, libelle, prix FROM TypeBillet WHERE id = :id');
        $requete->execute([':id' => $id]);
        $ligne = $requete->fetch();
        $requete = null;

        if ($ligne === false) {
            return null;
        }

        return new TypeBillet((int)$ligne['id'], (string)$ligne['libelle'], (float)$ligne['prix']);
    }
}
