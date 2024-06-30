using System;
using System.Collections.Generic;

namespace Models;

public partial class DetalleOrden
{
    public int IdDetalleOrden { get; set; }

    public int IdOrden { get; set; }

    public int IdProducto { get; set; }

    public int Cantidad { get; set; }

    public decimal PrecioUnitario { get; set; }

    public virtual Orden IdOrdenNavigation { get; set; } = null!;

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
