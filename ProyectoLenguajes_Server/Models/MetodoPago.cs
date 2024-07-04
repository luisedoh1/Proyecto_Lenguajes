using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public partial class MetodoPago
{
    public int IdMetodo { get; set; }

    [Required]
    public int IdUsuario { get; set; }

    [Required]
    public int IdTipo { get; set; }

    [Required]
    public string Token { get; set; } = null!;

    [JsonIgnore]
    public virtual TipoMetodoPago IdTipoNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
