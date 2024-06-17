
CREATE DATABASE Proyecto;

USE Proyecto;

CREATE TABLE Rol (
    ID_Rol	INT	NOT NULL IDENTITY(1,1)
    ,Nombre NVARCHAR(20) NOT NULL
	CONSTRAINT PK_Rol PRIMARY KEY (ID_Rol)
);

INSERT INTO Rol (Nombre) 
VALUES 
	 ('admin')
	,('vendedor')
	,('cliente');

CREATE TABLE Usuario (
    ID_Usuario INT IDENTITY(1,1)
	,Nombre NVARCHAR(100) NOT NULL
	,Email NVARCHAR(100) UNIQUE NOT NULL
	,Contraseņa NVARCHAR(255) NOT NULL
	,ID_Rol INT NOT NULL
	 CONSTRAINT PK_Usuario PRIMARY KEY (ID_Usuario)
    ,CONSTRAINT FK_Rol FOREIGN KEY (ID_Rol) REFERENCES Rol(ID_Rol)
);

CREATE TABLE Categoria (
    ID_Categoria INT  IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(MAX) NULL
	CONSTRAINT PK_Categoria PRIMARY KEY (ID_Categoria)
);

CREATE TABLE Caracteristica (
    ID_Caracteristica INT IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
	CONSTRAINT PK_Caracteristica PRIMARY KEY (ID_Caracteristica)
);

CREATE TABLE Producto (
    ID_Producto INT IDENTITY(1,1),
    Codigo NVARCHAR(50) NOT NULL,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(MAX) NULL,
    Cantidad INT NOT NULL,
    Categoria_ID INT NOT NULL,
    Imagen NVARCHAR(255) NULL, -- Ruta a la imagen en el sistema de archivos
    Precio DECIMAL(10, 2) NOT NULL,
    Caracteristica_ID1 INT NOT NULL,
    Caracteristica_ID2 INT NULL,
	CONSTRAINT PK_Producto PRIMARY KEY (ID_Producto),
    CONSTRAINT FK_Categoria FOREIGN KEY (Categoria_ID) REFERENCES Categoria(ID_Categoria),
    CONSTRAINT FK_Caracteristica_ID1 FOREIGN KEY (Caracteristica_ID1) REFERENCES Caracteristica(ID_Caracteristica),
    CONSTRAINT FK_Caracteristica_ID2 FOREIGN KEY (Caracteristica_ID2) REFERENCES Caracteristica(ID_Caracteristica)
);

CREATE TABLE Orden (
    ID_Orden INT IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
    Fecha DATETIME NOT NULL DEFAULT GETDATE(),
    Estado NVARCHAR(20) CHECK (Estado IN ('en proceso', 'enviado')) NOT NULL,
	CONSTRAINT PK_Orden PRIMARY KEY (ID_Orden),
    CONSTRAINT FK_ID_Usuario_Orden FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Detalle_Orden (
    ID_Detalle_Orden INT IDENTITY(1,1),
    ID_Orden INT NOT NULL,
    ID_Producto INT NOT NULL,
    Cantidad INT NOT NULL,
    Precio_Unitario DECIMAL(10, 2) NOT NULL,
	CONSTRAINT PK_Detalle_Orden PRIMARY KEY (ID_Detalle_Orden),
    CONSTRAINT FK_ID_Orden FOREIGN KEY (ID_Orden) REFERENCES Orden(ID_Orden),
    CONSTRAINT FK_ID_Producto_Orden FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

CREATE TABLE Carrito_Compra (
    ID_Carrito INT IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
    Fecha_Creacion DATETIME NOT NULL DEFAULT GETDATE(),
	CONSTRAINT PK_Carrito PRIMARY KEY (ID_Carrito),
    CONSTRAINT FK_ID_Usuario_Carrito FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Detalle_Carrito (
    ID_Detalle_Carrito INT IDENTITY(1,1),
    ID_Carrito INT NOT NULL,
    ID_Producto INT NOT NULL,
    Cantidad INT NOT NULL
	CONSTRAINT PK_Detalle_Carrito PRIMARY KEY (ID_Detalle_Carrito),
    CONSTRAINT FK_ID_Carrito FOREIGN KEY (ID_Carrito) REFERENCES Carrito_Compra(ID_Carrito),
    CONSTRAINT FK_ID_Producto_Carrito FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

CREATE TABLE Direccion_Entrega (
    ID_Direccion INT IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
    Direccion NVARCHAR(MAX) NOT NULL,
    Ciudad NVARCHAR(100) NOT NULL,
    Pais NVARCHAR(100) NOT NULL,
    Codigo_Postal NVARCHAR(20) NOT NULL,
	CONSTRAINT PK_Direccion PRIMARY KEY (ID_Direccion),
    CONSTRAINT FK_ID_Usuario_Direccion FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Tarjeta_Credito (
    ID_Tarjeta INT IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
    Numero_Tarjeta NVARCHAR(20) NOT NULL,
    Fecha_Expiracion DATE NOT NULL,
    Token NVARCHAR(255) NOT NULL,
	CONSTRAINT PK_Tarjeta PRIMARY KEY (ID_Tarjeta),
    CONSTRAINT FK_ID_Usuario_Tarjeta FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Lista_Deseo (
    ID_Lista_Deseo INT IDENTITY(1,1),
    ID_Usuario INT NOT NULL,
	CONSTRAINT PK_Lista_Deseo PRIMARY KEY (ID_Lista_Deseo),
    CONSTRAINT FK_ID_Usuario_ListaD FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Detalle_Lista_Deseo (
    ID_Detalle_Lista INT IDENTITY(1,1),
    ID_Lista_Deseo INT NOT NULL,
    ID_Producto INT NOT NULL,
	CONSTRAINT PK_Detalle_Lista PRIMARY KEY (ID_Detalle_Lista),
    CONSTRAINT FK_ID_Lista_Deseo FOREIGN KEY (ID_Lista_Deseo) REFERENCES Lista_Deseo(ID_Lista_Deseo),
    CONSTRAINT FK_ID_Producto_ListaD FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);