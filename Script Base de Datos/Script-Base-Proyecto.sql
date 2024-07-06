
CREATE DATABASE Proyecto;
GO

USE Proyecto;

CREATE TABLE Rol (
    ID_Rol	INT	NOT NULL IDENTITY(1,1)
    ,Nombre NVARCHAR(20) NOT NULL
	CONSTRAINT PK_Rol PRIMARY KEY (ID_Rol)
);

CREATE TABLE Usuario (
    ID_Usuario INT IDENTITY(1,1)
	,Nombre NVARCHAR(100) NOT NULL
	,Email NVARCHAR(100) UNIQUE NOT NULL
	,Contraseña NVARCHAR(255) NOT NULL
	,ID_Rol INT NOT NULL
	 CONSTRAINT PK_Usuario PRIMARY KEY (ID_Usuario)
    ,CONSTRAINT FK_Rol FOREIGN KEY (ID_Rol) REFERENCES Rol(ID_Rol)
);

CREATE TABLE Categoria (
    ID_Categoria INT  IDENTITY(1,1)
    ,Nombre NVARCHAR(100) NOT NULL
    ,Descripcion NVARCHAR(MAX) NULL
	CONSTRAINT PK_Categoria PRIMARY KEY (ID_Categoria)
);

CREATE TABLE Tipo_Caracteristica(
	ID_Tipo INT IDENTITY(1,1)
	,Nombre NVARCHAR(50) NOT NULL
	CONSTRAINT PK_TipoCaracteristica PRIMARY KEY (ID_Tipo)
);

CREATE TABLE Caracteristica (
    ID_Caracteristica INT IDENTITY(1,1)
	,ID_Tipo INT
    ,Nombre NVARCHAR(100) NOT NULL
 	CONSTRAINT PK_Caracteristica PRIMARY KEY (ID_Caracteristica),
	CONSTRAINT FK_TipoCaracteristica FOREIGN KEY (ID_Tipo) REFERENCES Tipo_Caracteristica(ID_Tipo)
);

CREATE TABLE Producto (
    ID_Producto INT IDENTITY(1,1)
    ,Codigo NVARCHAR(50) NOT NULL
    ,Nombre NVARCHAR(100) NOT NULL
    ,Descripcion NVARCHAR(MAX) NULL
    ,Cantidad INT NOT NULL
    ,Categoria_ID INT NOT NULL
    ,Imagen NVARCHAR(255) NULL
    ,Precio DECIMAL(10, 2) NOT NULL
    ,Caracteristica_ID1 INT NOT NULL
    ,Caracteristica_ID2 INT NULL
	,FechaAñadido DATETIME NOT NULL DEFAULT GETDATE()
	,CONSTRAINT PK_Producto PRIMARY KEY (ID_Producto)
    ,CONSTRAINT FK_Categoria FOREIGN KEY (Categoria_ID) REFERENCES Categoria(ID_Categoria)
    ,CONSTRAINT FK_Caracteristica_ID1 FOREIGN KEY (Caracteristica_ID1) REFERENCES Caracteristica(ID_Caracteristica)
    ,CONSTRAINT FK_Caracteristica_ID2 FOREIGN KEY (Caracteristica_ID2) REFERENCES Caracteristica(ID_Caracteristica)
);


CREATE TABLE Orden (
    ID_Orden INT IDENTITY(1,1)
    ,ID_Usuario INT NOT NULL
    ,Fecha DATETIME NOT NULL DEFAULT GETDATE()
    ,Estado NVARCHAR(20) CHECK (Estado IN ('en proceso', 'enviado')) NOT NULL
	,CONSTRAINT PK_Orden PRIMARY KEY (ID_Orden)
    ,CONSTRAINT FK_ID_Usuario_Orden FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Detalle_Orden (
    ID_Detalle_Orden INT IDENTITY(1,1)
    ,ID_Orden INT NOT NULL
    ,ID_Producto INT NOT NULL
    ,Cantidad INT NOT NULL
    ,Precio_Unitario DECIMAL(10, 2) NOT NULL
	,CONSTRAINT PK_Detalle_Orden PRIMARY KEY (ID_Detalle_Orden)
    ,CONSTRAINT FK_ID_Orden FOREIGN KEY (ID_Orden) REFERENCES Orden(ID_Orden)
    ,CONSTRAINT FK_ID_Producto_Orden FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

CREATE TABLE Carrito_Compra (
    ID_Carrito INT IDENTITY(1,1)
    ,ID_Usuario INT NOT NULL
    ,Fecha_Creacion DATETIME NOT NULL DEFAULT GETDATE()
	,CONSTRAINT PK_Carrito PRIMARY KEY (ID_Carrito)
    ,CONSTRAINT FK_ID_Usuario_Carrito FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Detalle_Carrito (
    ID_Detalle_Carrito INT IDENTITY(1,1)
    ,ID_Carrito INT NOT NULL
    ,ID_Producto INT NOT NULL
    ,Cantidad INT NOT NULL
	,CONSTRAINT PK_Detalle_Carrito PRIMARY KEY (ID_Detalle_Carrito)
    ,CONSTRAINT FK_ID_Carrito FOREIGN KEY (ID_Carrito) REFERENCES Carrito_Compra(ID_Carrito)
    ,CONSTRAINT FK_ID_Producto_Carrito FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

CREATE TABLE Direccion_Entrega (
    ID_Direccion INT IDENTITY(1,1)
    ,ID_Usuario INT NOT NULL
    ,Direccion NVARCHAR(MAX) NOT NULL
    ,Ciudad NVARCHAR(100) NOT NULL
    ,Pais NVARCHAR(100) NOT NULL
    ,Codigo_Postal NVARCHAR(20) NOT NULL
	,CONSTRAINT PK_Direccion PRIMARY KEY (ID_Direccion)
    ,CONSTRAINT FK_ID_Usuario_Direccion FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Tipo_Metodo_Pago(
	ID_Tipo_Metodo INT IDENTITY(1,1)
	,Descripcion NVARCHAR(50) NOT NULL
	,CONSTRAINT PK_TipoMetodo PRIMARY KEY (ID_Tipo_Metodo)
);

CREATE TABLE Metodo_Pago (
    ID_Metodo INT IDENTITY(1,1)
    ,ID_Usuario INT NOT NULL
	,ID_Tipo INT NOT NULL
    ,Token NVARCHAR(255) NOT NULL
	,CONSTRAINT PK_Metodo PRIMARY KEY (ID_Metodo)
    ,CONSTRAINT FK_ID_Usuario_Tarjeta FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
	,CONSTRAINT FK_ID_Tipo_Metodo FOREIGN KEY (ID_Tipo) REFERENCES Tipo_Metodo_Pago(ID_Tipo_Metodo)
);

CREATE TABLE Lista_Deseo (
    ID_Lista_Deseo INT IDENTITY(1,1)
    ,ID_Usuario INT NOT NULL
	,CONSTRAINT PK_Lista_Deseo PRIMARY KEY (ID_Lista_Deseo)
    ,CONSTRAINT FK_ID_Usuario_ListaD FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Detalle_Lista_Deseo (
    ID_Detalle_Lista INT IDENTITY(1,1)
    ,ID_Lista_Deseo INT NOT NULL
    ,ID_Producto INT NOT NULL
	,CONSTRAINT PK_Detalle_Lista PRIMARY KEY (ID_Detalle_Lista)
    ,CONSTRAINT FK_ID_Lista_Deseo FOREIGN KEY (ID_Lista_Deseo) REFERENCES Lista_Deseo(ID_Lista_Deseo)
    ,CONSTRAINT FK_ID_Producto_ListaD FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

INSERT INTO Rol (Nombre) 
VALUES 
	 ('admin')
	,('vendedor')
	,('cliente');

INSERT INTO Categoria (Nombre, Descripcion) VALUES ('Smartphones', 'Dispositivos móviles');
INSERT INTO Categoria (Nombre, Descripcion) VALUES ('Accesorios Electrónicos', 'Accesorios para dispositivos electronicos');

INSERT INTO Tipo_Caracteristica(Nombre) VALUES ('Color');
INSERT INTO Tipo_Caracteristica(Nombre) VALUES ('Almacenamiento');
INSERT INTO Tipo_Caracteristica(Nombre) VALUES ('Tamaño Monitor');
INSERT INTO Tipo_Caracteristica(Nombre) VALUES ('Marca');

INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('Negro', 1);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('Blanco', 1);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('Rojo', 1);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('Azul', 1);

INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('64 GB', 2);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('128 GB', 2);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('256 GB', 2);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('512 GB', 2);

INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('20"', 3);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('22"', 3);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('24"', 3);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('27"', 3);

INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('Intel', 4);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('AMD', 4);
INSERT INTO Caracteristica(Nombre,ID_Tipo) VALUES ('Nvidia', 4);



INSERT INTO Producto (Codigo, Nombre, Descripcion, Cantidad, Categoria_ID, Precio, Caracteristica_ID1, Caracteristica_ID2) 
VALUES ('IP13P-128', 'iPhone 13 Pro', 'iPhone 13 Pro 128GB', 50, 
(SELECT ID_Categoria FROM Categoria WHERE Nombre = 'Smartphones'), 999.00, 
(SELECT ID_Caracteristica FROM Caracteristica WHERE Nombre = 'Negro'), 
(SELECT ID_Caracteristica FROM Caracteristica WHERE Nombre = '128 GB'));
GO

INSERT INTO Usuario
           ([Nombre]
           ,[Email]
           ,[Contraseña]
           ,[ID_Rol])
     VALUES
           (N'Luis Hodgson'
           ,N'admin@mail.com'
           ,N'user123'
           ,1);
GO

INSERT INTO Usuario
           ([Nombre]
           ,[Email]
           ,[Contraseña]
           ,[ID_Rol])
     VALUES
           (N'Ventas'
           ,N'ventas@mail.com'
           ,N'user123'
           ,2);
GO

INSERT INTO Usuario
           ([Nombre]
           ,[Email]
           ,[Contraseña]
           ,[ID_Rol])
     VALUES
           (N'Comprador'
           ,N'ventas@mail.com'
           ,N'user123'
           ,3);
GO

INSERT INTO Orden
           ([ID_Usuario]
           ,[Fecha]
           ,[Estado])
     VALUES
           (2
           ,GETDATE()
           ,'En Proceso')
GO

INSERT INTO Detalle_Orden
           ([ID_Orden]
           ,[ID_Producto]
           ,[Cantidad]
           ,[Precio_Unitario])
     VALUES
           (1
           ,4
           ,2
           ,(SELECT Precio FROM Producto WHERE ID_Producto = 4));
GO

INSERT INTO Tipo_Metodo_Pago
           ([Descripcion])
     VALUES
           (N'Debito'),
		   (N'Credito')
GO