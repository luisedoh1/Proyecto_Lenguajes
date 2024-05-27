CREATE DATABASE Proyecto;

USE Proyecto;

CREATE TABLE Rol (
    ID_Rol	INT	NOT NULL IDENTITY(1,1)
    ,Nombre NVARCHAR(20) NOT NULL
	CONSTRAINT PK_Rol PRIMARY KEY (ID_Rol)
);

INSERT INTO Rol (Nombre) VALUES ('admin'), ('vendedor'), ('cliente');

CREATE TABLE Usuario (
    ID_Usuario INT PRIMARY KEY IDENTITY(1,1)
	,Nombre NVARCHAR(100) NOT NULL
	,Email NVARCHAR(100) UNIQUE NOT NULL
	,Contraseña NVARCHAR(255) NOT NULL
	,ID_Rol INT NOT NULL
	 CONSTRAINT PK_Usuario PRIMARY KEY (ID_Usuario)
    ,CONSTRAINT FK_Rol FOREIGN KEY (ID_Rol) REFERENCES Rol(ID_Rol)
);

CREATE TABLE Categoria (
    ID_Categoria INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(MAX) NULL
);

CREATE TABLE Caracteristica (
    ID_Caracteristica INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);

CREATE TABLE Producto (
    ID_Producto INT PRIMARY KEY IDENTITY(1,1),
    Codigo NVARCHAR(50) NOT NULL,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(MAX) NULL,
    Cantidad INT NOT NULL,
    Categoria_ID INT NOT NULL,
    Imagen NVARCHAR(255) NULL, -- Ruta a la imagen en el sistema de archivos
    Precio DECIMAL(10, 2) NOT NULL,
    Caracteristica_ID1 INT NOT NULL,
    Caracteristica_ID2 INT NULL,
    FOREIGN KEY (Categoria_ID) REFERENCES Categoria(ID_Categoria),
    FOREIGN KEY (Caracteristica_ID1) REFERENCES Caracteristica(ID_Caracteristica),
    FOREIGN KEY (Caracteristica_ID2) REFERENCES Caracteristica(ID_Caracteristica)
);

CREATE TABLE Orden (
    ID_Orden INT PRIMARY KEY IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
    Fecha DATETIME NOT NULL DEFAULT GETDATE(),
    Estado NVARCHAR(20) CHECK (Estado IN ('en proceso', 'enviado')) NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Detalle_Orden (
    ID_Detalle_Orden INT PRIMARY KEY IDENTITY(1,1),
    ID_Orden INT NOT NULL,
    ID_Producto INT NOT NULL,
    Cantidad INT NOT NULL,
    Precio_Unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ID_Orden) REFERENCES Orden(ID_Orden),
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

CREATE TABLE Carrito_Compra (
    ID_Carrito INT PRIMARY KEY IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
    Fecha_Creacion DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Detalle_Carrito (
    ID_Detalle_Carrito INT PRIMARY KEY IDENTITY(1,1),
    ID_Carrito INT NOT NULL,
    ID_Producto INT NOT NULL,
    Cantidad INT NOT NULL,
    FOREIGN KEY (ID_Carrito) REFERENCES Carrito_Compra(ID_Carrito),
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

CREATE TABLE Direccion_Entrega (
    ID_Direccion INT PRIMARY KEY IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
    Direccion NVARCHAR(MAX) NOT NULL,
    Ciudad NVARCHAR(100) NOT NULL,
    Pais NVARCHAR(100) NOT NULL,
    Codigo_Postal NVARCHAR(20) NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Tarjeta_Credito (
    ID_Tarjeta INT PRIMARY KEY IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
    Numero_Tarjeta NVARCHAR(20) NOT NULL,
    Fecha_Expiracion DATE NOT NULL,
    Token NVARCHAR(255) NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Lista_Deseo (
    ID_Lista_Deseo INT PRIMARY KEY IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Detalle_Lista_Deseo (
    ID_Detalle_Lista INT PRIMARY KEY IDENTITY(1,1),
    ID_Lista_Deseo INT NOT NULL,
    ID_Producto INT NOT NULL,
    FOREIGN KEY (ID_Lista_Deseo) REFERENCES Lista_Deseo(ID_Lista_Deseo),
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);