using System;
using System.Collections.Generic;

namespace Models;

public partial class ListaDeseo
{
    public int IdListaDeseo { get; set; }

    public int IdUsuario { get; set; }

    public virtual ICollection<DetalleListaDeseo> DetalleListaDeseos { get; set; } = new List<DetalleListaDeseo>();

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
