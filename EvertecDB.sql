/*
 * BASE DE DATOS CREADA POR REOARRIETA :V
 * VERSION 0.0.1
 * COPYRIGHT 2023
 */

--Creamos la base de datos [Evertec]--
create database Evertec
go
--Usamos la base de datos [Evertec]--
use Evertec
go

--Creamos la tabla DataInfo--
create table DataInfo
(
id int identity(1,1) not null,
Name varchar(50) not null,
LastName varchar(50) not null,
BirthDay date not null,
UserPhoto varchar(max) not null,
MaritalStatus int not null,
HasSiblings bit not null,
--Establecemos la llave primaria--
constraint PK_DataInfo primary key (id)
)