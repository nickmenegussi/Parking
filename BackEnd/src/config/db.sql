CREATE DATABASE Estacionamento;
USE Estacionamento;

CREATE TABLE User(
    idUser int primary key auto_increment not null,
    email varchar(255),
    password varchar(255),
    cpf varchar(11)
);

CREATE TABLE Carro(
    idCarro int primary key auto_increment not null,
    CarLicensePlate varchar(255),
    BrandAndModel varchar(255),
    StatusCar Enum('Estacionado', 'Saiu') not null,
    userId int not null,
    dateAtCreate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) references User(idUser)

);