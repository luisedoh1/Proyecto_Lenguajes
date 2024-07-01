using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models;

public partial class DetalleCarrito
{
    [JsonIgnore]
    public int IdDetalleCarrito { get; set; }

    public int IdCarrito { get; set; }

    public int IdProducto { get; set; }

    public int Cantidad { get; set; }

    [JsonIgnore]
    public virtual CarritoCompra IdCarritoNavigation { get; set; } = null!;

    [JsonIgnore]
    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
