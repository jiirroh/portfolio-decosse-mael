<?php

class DeveloppeurJsonDAO
{
    private string $file;

    public function __construct(string $nomFichier = 'developpeur.json')
    {
        // chemin relatif depuis /site
        $this->file = __DIR__ . DIRECTORY_SEPARATOR . $nomFichier;
    }

    /**
     * Retourne la liste des développeurs à partir du fichier JSON
     * @return array<int, array{ id: string|int, nom: string, prenom: string }>
     */
    public function getLesDeveloppeurs(): array
    {
        try {
            $contenuFichier = @file_get_contents($this->file);
            if ($contenuFichier === false) {
                throw new Exception('Impossible de lire le fichier JSON: ' . $this->file);
            }
            $data = json_decode($contenuFichier, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('JSON invalide dans ' . $this->file . ' : ' . json_last_error_msg());
            }
            if (!is_array($data)) {
                return [];
            }
            return $data;
        } catch (Throwable $e) {
            // En production, on journaliserait l'erreur
            return [];
        }
    }
}
