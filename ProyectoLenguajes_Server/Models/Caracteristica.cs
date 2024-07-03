using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models;

public partial class Caracteristica
{
    public int IdCaracteristica { get; set; }

    public int? IdTipo { get; set; }

    public string Nombre { get; set; } = null!;

    [JsonIgnore]
    public virtual TipoCaracteristica? IdTipoNavigation { get; set; }
    [JsonIgnore]
    public virtual ICollection<Producto> ProductoCaracteristicaId1Navigations { get; set; } = new List<Producto>();
    [JsonIgnore]
    public virtual ICollection<Producto> ProductoCaracteristicaId2Navigations { get; set; } = new List<Producto>();
}
