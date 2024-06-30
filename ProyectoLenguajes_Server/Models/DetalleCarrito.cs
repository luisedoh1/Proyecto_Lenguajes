using System;
using System.Collections.Generic;

namespace Models;

public partial class DetalleCarrito
{
    public int IdDetalleCarrito { get; set; }

    public int IdCarrito { get; set; }

    public int IdProducto { get; set; }

    public int Cantidad { get; set; }

    public virtual CarritoCompra IdCarritoNavigation { get; set; } = null!;

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
