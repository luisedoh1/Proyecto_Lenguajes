using System;
using System.Collections.Generic;

namespace Models;

public partial class Orden
{
    public int IdOrden { get; set; }

    public int IdUsuario { get; set; }

    public DateTime Fecha { get; set; }

    public string Estado { get; set; } = null!;

    public virtual ICollection<DetalleOrden> DetalleOrdens { get; set; } = new List<DetalleOrden>();

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
