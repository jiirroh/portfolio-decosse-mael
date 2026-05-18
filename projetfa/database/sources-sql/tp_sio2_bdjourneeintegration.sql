USE projetfa;

#------------------------------------------------------------
# Table: ReservationBillet (drop pour cohérence)
#------------------------------------------------------------

DROP TABLE IF EXISTS `ReservationBillet`;

#------------------------------------------------------------
# Table: Reservation (drop pour cohérence)
#------------------------------------------------------------

DROP TABLE IF EXISTS `Reservation`;

#------------------------------------------------------------
# Table: TypeBillet (drop pour cohérence)
#------------------------------------------------------------

DROP TABLE IF EXISTS `TypeBillet`;

#------------------------------------------------------------
# Table: Developpeur
#------------------------------------------------------------

DROP TABLE IF EXISTS `Developpeur`;

CREATE TABLE Developpeur (
    id int Auto_increment NOT NULL,
    nom Varchar(20) NOT NULL,
    prenom Varchar(15) NOT NULL,
    CONSTRAINT Classe_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

INSERT INTO
    Developpeur
VALUES ('1', 'COVER', 'Harry'),
    ('2', 'TOUIL', 'Sacha'),
    ('3', 'GUETTE', 'Garry');

#------------------------------------------------------------
# Table: Competence
#------------------------------------------------------------
CREATE TABLE Competence(
        id      Int  Auto_increment  PRIMARY KEY NOT NULL ,
        nom Varchar (40) NOT NULL
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: TypeBillet
#------------------------------------------------------------

CREATE TABLE TypeBillet (
    id INT AUTO_INCREMENT NOT NULL,
    libelle VARCHAR(80) NOT NULL,
    prix DECIMAL(8,2) NOT NULL,
    CONSTRAINT TypeBillet_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

#------------------------------------------------------------
# Table: Reservation
#------------------------------------------------------------

CREATE TABLE Reservation (
    id INT AUTO_INCREMENT NOT NULL,
    prenom VARCHAR(60) NOT NULL,
    nom VARCHAR(60) NOT NULL,
    email VARCHAR(120),
    telephone VARCHAR(20),
    date_visite DATE NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    CONSTRAINT Reservation_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

#------------------------------------------------------------
# Table: ReservationBillet
#------------------------------------------------------------

CREATE TABLE ReservationBillet (
    id INT AUTO_INCREMENT NOT NULL,
    reservation_id INT NOT NULL,
    type_billet_id INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(8,2) NOT NULL,
    CONSTRAINT ReservationBillet_PK PRIMARY KEY (id),
    CONSTRAINT ReservationBillet_Reservation_FK FOREIGN KEY (reservation_id) REFERENCES Reservation(id) ON DELETE CASCADE,
    CONSTRAINT ReservationBillet_TypeBillet_FK FOREIGN KEY (type_billet_id) REFERENCES TypeBillet(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci;

#------------------------------------------------------------
# Données de départ
#------------------------------------------------------------
INSERT INTO Competence VALUES ('1', 'Développement Web- CSS');

INSERT INTO TypeBillet (id, libelle, prix) VALUES
    (1, 'Adulte', 8.00),
    (2, 'Réduit', 6.00),
    (3, 'Enfant', 4.50);


#------------------------------------------------------------
# Habilitations
#------------------------------------------------------------
GRANT SELECT ON `projetfa`.`Developpeur` TO 'JI_Dev_Read'@'%';
GRANT SELECT, DELETE, UPDATE, INSERT ON `projetfa`.`Developpeur` TO 'JI_Dev_Write'@'%';

GRANT SELECT ON `projetfa`.`Competence` TO 'JI_Dev_Read'@'%';
GRANT SELECT, DELETE ON `projetfa`.`Competence` TO 'JI_Dev_Write'@'%';

GRANT SELECT ON `projetfa`.`TypeBillet` TO 'JI_Dev_Read'@'%';

GRANT SELECT, INSERT ON `projetfa`.`Reservation` TO 'JI_Dev_Write'@'%';
GRANT SELECT, INSERT ON `projetfa`.`ReservationBillet` TO 'JI_Dev_Write'@'%';
