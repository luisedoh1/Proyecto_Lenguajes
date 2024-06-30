using System;
using System.Collections.Generic;

namespace Models;

public partial class TipoMetodoPago
{
    public int IdTipoMetodo { get; set; }

    public string Descripcion { get; set; } = null!;

    public virtual ICollection<MetodoPago> MetodoPagos { get; set; } = new List<MetodoPago>();
}
