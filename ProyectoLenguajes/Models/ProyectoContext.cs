using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Models;

public partial class ProyectoContext : DbContext
{
    public ProyectoContext()
    {
    }

    public ProyectoContext(DbContextOptions<ProyectoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Caracteristica> Caracteristicas { get; set; }

    public virtual DbSet<CarritoCompra> CarritoCompras { get; set; }

    public virtual DbSet<Categoria> Categoria { get; set; }

    public virtual DbSet<DetalleCarrito> DetalleCarritos { get; set; }

    public virtual DbSet<DetalleListaDeseo> DetalleListaDeseos { get; set; }

    public virtual DbSet<DetalleOrden> DetalleOrdens { get; set; }

    public virtual DbSet<DireccionEntrega> DireccionEntregas { get; set; }

    public virtual DbSet<ListaDeseo> ListaDeseos { get; set; }

    public virtual DbSet<Orden> Ordens { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<TarjetaCredito> TarjetaCreditos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Caracteristica>(entity =>
        {
            entity.HasKey(e => e.IdCaracteristica);

            entity.ToTable("Caracteristica");

            entity.Property(e => e.IdCaracteristica).HasColumnName("ID_Caracteristica");
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<CarritoCompra>(entity =>
        {
            entity.HasKey(e => e.IdCarrito).HasName("PK_Carrito");

            entity.ToTable("Carrito_Compra");

            entity.Property(e => e.IdCarrito).HasColumnName("ID_Carrito");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("Fecha_Creacion");
            entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.CarritoCompras)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Usuario_Carrito");
        });

        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.IdCategoria);

            entity.Property(e => e.IdCategoria).HasColumnName("ID_Categoria");
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<DetalleCarrito>(entity =>
        {
            entity.HasKey(e => e.IdDetalleCarrito);

            entity.ToTable("Detalle_Carrito");

            entity.Property(e => e.IdDetalleCarrito).HasColumnName("ID_Detalle_Carrito");
            entity.Property(e => e.IdCarrito).HasColumnName("ID_Carrito");
            entity.Property(e => e.IdProducto).HasColumnName("ID_Producto");

            entity.HasOne(d => d.IdCarritoNavigation).WithMany(p => p.DetalleCarritos)
                .HasForeignKey(d => d.IdCarrito)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Carrito");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.DetalleCarritos)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Producto_Carrito");
        });

        modelBuilder.Entity<DetalleListaDeseo>(entity =>
        {
            entity.HasKey(e => e.IdDetalleLista).HasName("PK_Detalle_Lista");

            entity.ToTable("Detalle_Lista_Deseo");

            entity.Property(e => e.IdDetalleLista).HasColumnName("ID_Detalle_Lista");
            entity.Property(e => e.IdListaDeseo).HasColumnName("ID_Lista_Deseo");
            entity.Property(e => e.IdProducto).HasColumnName("ID_Producto");

            entity.HasOne(d => d.IdListaDeseoNavigation).WithMany(p => p.DetalleListaDeseos)
                .HasForeignKey(d => d.IdListaDeseo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Lista_Deseo");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.DetalleListaDeseos)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Producto_ListaD");
        });

        modelBuilder.Entity<DetalleOrden>(entity =>
        {
            entity.HasKey(e => e.IdDetalleOrden);

            entity.ToTable("Detalle_Orden");

            entity.Property(e => e.IdDetalleOrden).HasColumnName("ID_Detalle_Orden");
            entity.Property(e => e.IdOrden).HasColumnName("ID_Orden");
            entity.Property(e => e.IdProducto).HasColumnName("ID_Producto");
            entity.Property(e => e.PrecioUnitario)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("Precio_Unitario");

            entity.HasOne(d => d.IdOrdenNavigation).WithMany(p => p.DetalleOrdens)
                .HasForeignKey(d => d.IdOrden)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Orden");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.DetalleOrdens)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Producto_Orden");
        });

        modelBuilder.Entity<DireccionEntrega>(entity =>
        {
            entity.HasKey(e => e.IdDireccion).HasName("PK_Direccion");

            entity.ToTable("Direccion_Entrega");

            entity.Property(e => e.IdDireccion).HasColumnName("ID_Direccion");
            entity.Property(e => e.Ciudad).HasMaxLength(100);
            entity.Property(e => e.CodigoPostal)
                .HasMaxLength(20)
                .HasColumnName("Codigo_Postal");
            entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");
            entity.Property(e => e.Pais).HasMaxLength(100);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.DireccionEntregas)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Usuario_Direccion");
        });

        modelBuilder.Entity<ListaDeseo>(entity =>
        {
            entity.HasKey(e => e.IdListaDeseo);

            entity.ToTable("Lista_Deseo");

            entity.Property(e => e.IdListaDeseo).HasColumnName("ID_Lista_Deseo");
            entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.ListaDeseos)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Usuario_ListaD");
        });

        modelBuilder.Entity<Orden>(entity =>
        {
            entity.HasKey(e => e.IdOrden);

            entity.ToTable("Orden");

            entity.Property(e => e.IdOrden).HasColumnName("ID_Orden");
            entity.Property(e => e.Estado).HasMaxLength(20);
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Ordens)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Usuario_Orden");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto);

            entity.ToTable("Producto");

            entity.Property(e => e.IdProducto).HasColumnName("ID_Producto");
            entity.Property(e => e.CaracteristicaId1).HasColumnName("Caracteristica_ID1");
            entity.Property(e => e.CaracteristicaId2).HasColumnName("Caracteristica_ID2");
            entity.Property(e => e.CategoriaId).HasColumnName("Categoria_ID");
            entity.Property(e => e.Codigo).HasMaxLength(50);
            entity.Property(e => e.Imagen).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.Precio).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.CaracteristicaId1Navigation).WithMany(p => p.ProductoCaracteristicaId1Navigations)
                .HasForeignKey(d => d.CaracteristicaId1)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Caracteristica_ID1");

            entity.HasOne(d => d.CaracteristicaId2Navigation).WithMany(p => p.ProductoCaracteristicaId2Navigations)
                .HasForeignKey(d => d.CaracteristicaId2)
                .HasConstraintName("FK_Caracteristica_ID2");

            entity.HasOne(d => d.Categoria).WithMany(p => p.Productos)
                .HasForeignKey(d => d.CategoriaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Categoria");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.IdRol);

            entity.ToTable("Rol");

            entity.Property(e => e.IdRol).HasColumnName("ID_Rol");
            entity.Property(e => e.Nombre).HasMaxLength(20);
        });

        modelBuilder.Entity<TarjetaCredito>(entity =>
        {
            entity.HasKey(e => e.IdTarjeta).HasName("PK_Tarjeta");

            entity.ToTable("Tarjeta_Credito");

            entity.Property(e => e.IdTarjeta).HasColumnName("ID_Tarjeta");
            entity.Property(e => e.FechaExpiracion).HasColumnName("Fecha_Expiracion");
            entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");
            entity.Property(e => e.NumeroTarjeta)
                .HasMaxLength(20)
                .HasColumnName("Numero_Tarjeta");
            entity.Property(e => e.Token).HasMaxLength(255);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.TarjetaCreditos)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID_Usuario_Tarjeta");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario);

            entity.ToTable("Usuario");

            entity.HasIndex(e => e.Email, "UQ__Usuario__A9D10534DDC3CCE6").IsUnique();

            entity.Property(e => e.IdUsuario).HasColumnName("ID_Usuario");
            entity.Property(e => e.Contraseña).HasMaxLength(255);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.IdRol).HasColumnName("ID_Rol");
            entity.Property(e => e.Nombre).HasMaxLength(100);

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Rol");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
