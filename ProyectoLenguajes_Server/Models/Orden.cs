using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public partial class Orden
{
    public int IdOrden { get; set; }

    [Required]
    public int IdUsuario { get; set; }

    [Required]
    public DateTime Fecha { get; set; }

    [Required]
    public string Estado { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<DetalleOrden> DetalleOrdens { get; set; } = new List<DetalleOrden>();

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
