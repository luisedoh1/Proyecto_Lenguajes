using System;
using System.Collections.Generic;

namespace Models;

public partial class TipoCaracteristica
{
    public int IdTipo { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Caracteristica> Caracteristicas { get; set; } = new List<Caracteristica>();
}
