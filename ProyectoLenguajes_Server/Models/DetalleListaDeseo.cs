using System;
using System.Collections.Generic;

namespace Models;

public partial class DetalleListaDeseo
{
    public int IdDetalleLista { get; set; }

    public int IdListaDeseo { get; set; }

    public int IdProducto { get; set; }

    public virtual ListaDeseo IdListaDeseoNavigation { get; set; } = null!;

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
