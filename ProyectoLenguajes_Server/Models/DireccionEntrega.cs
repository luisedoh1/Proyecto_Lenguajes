using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public partial class DireccionEntrega
{
    public int IdDireccion { get; set; }

    [Required]
    public int IdUsuario { get; set; }

    [Required]
    public string Direccion { get; set; } = null!;

    [Required]
    public string Ciudad { get; set; } = null!;

    [Required]
    public string Pais { get; set; } = null!;

    [Required]
    public string CodigoPostal { get; set; } = null!;

    [JsonIgnore]
    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
