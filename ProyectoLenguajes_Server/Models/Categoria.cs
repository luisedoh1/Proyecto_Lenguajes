using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public partial class Categoria
{
    [JsonInclude]
    public int IdCategoria { get; set; }

    [Required]
    public string Nombre { get; set; } = null!;

    [Required]
    public string? Descripcion { get; set; }

    [JsonIgnore]
    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
