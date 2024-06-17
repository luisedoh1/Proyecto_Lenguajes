using System;
using System.Collections.Generic;

namespace Models;

public partial class Caracteristica
{
    public int IdCaracteristica { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Producto> ProductoCaracteristicaId1Navigations { get; set; } = new List<Producto>();

    public virtual ICollection<Producto> ProductoCaracteristicaId2Navigations { get; set; } = new List<Producto>();
}
