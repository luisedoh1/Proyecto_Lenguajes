using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models;

public partial class CarritoCompra
{
    public int IdCarrito { get; set; }

    public int IdUsuario { get; set; }

    public DateTime FechaCreacion { get; set; }


    public virtual ICollection<DetalleCarrito> DetalleCarritos { get; set; } = new List<DetalleCarrito>();

    [JsonIgnore]
    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
