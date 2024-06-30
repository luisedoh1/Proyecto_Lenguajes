using System;
using System.Collections.Generic;

namespace Models;

public partial class MetodoPago
{
    public int IdMetodo { get; set; }

    public int IdUsuario { get; set; }

    public int IdTipo { get; set; }

    public string NumeroTarjeta { get; set; } = null!;

    public DateOnly FechaExpiracion { get; set; }

    public string Token { get; set; } = null!;

    public virtual TipoMetodoPago IdTipoNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
