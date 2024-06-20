using System;
using System.Collections.Generic;

namespace Models;

public partial class Producto
{
    public int IdProducto { get; set; }

    public string Codigo { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public int Cantidad { get; set; }

    public int CategoriaId { get; set; }

    public string? Imagen { get; set; }

    public decimal Precio { get; set; }

    public int CaracteristicaId1 { get; set; }

    public int? CaracteristicaId2 { get; set; }

    public virtual Caracteristica CaracteristicaId1Navigation { get; set; } = null!;

    public virtual Caracteristica? CaracteristicaId2Navigation { get; set; }

    public virtual Categoria Categoria { get; set; } = null!;

    public virtual ICollection<DetalleCarrito> DetalleCarritos { get; set; } = new List<DetalleCarrito>();

    public virtual ICollection<DetalleListaDeseo> DetalleListaDeseos { get; set; } = new List<DetalleListaDeseo>();

    public virtual ICollection<DetalleOrden> DetalleOrdens { get; set; } = new List<DetalleOrden>();
}
