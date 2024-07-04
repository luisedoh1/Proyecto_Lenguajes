using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    [Required]
    public string Nombre { get; set; } = null!;
    [Required]
    public string Email { get; set; } = null!;
    [Required]
    public string Contraseña { get; set; } = null!;

    [Required]
    public int IdRol { get; set; }

    [JsonIgnore]
    public virtual ICollection<CarritoCompra> CarritoCompras { get; set; } = new List<CarritoCompra>();

    [JsonIgnore]
    public virtual ICollection<DireccionEntrega> DireccionEntregas { get; set; } = new List<DireccionEntrega>();

    [JsonIgnore]
    public virtual Rol IdRolNavigation { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<ListaDeseo> ListaDeseos { get; set; } = new List<ListaDeseo>();

    [JsonIgnore]
    public virtual ICollection<MetodoPago> MetodoPagos { get; set; } = new List<MetodoPago>();

    [JsonIgnore]
    public virtual ICollection<Orden> Ordens { get; set; } = new List<Orden>();
}
