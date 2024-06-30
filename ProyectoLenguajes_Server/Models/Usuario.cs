using System;
using System.Collections.Generic;

namespace Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string Nombre { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public int IdRol { get; set; }

    public virtual ICollection<CarritoCompra> CarritoCompras { get; set; } = new List<CarritoCompra>();

    public virtual ICollection<DireccionEntrega> DireccionEntregas { get; set; } = new List<DireccionEntrega>();

    public virtual Rol IdRolNavigation { get; set; } = null!;

    public virtual ICollection<ListaDeseo> ListaDeseos { get; set; } = new List<ListaDeseo>();

    public virtual ICollection<MetodoPago> MetodoPagos { get; set; } = new List<MetodoPago>();

    public virtual ICollection<Orden> Ordens { get; set; } = new List<Orden>();
}
