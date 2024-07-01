using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models;

public partial class Producto
{
    [JsonIgnore]
    public int IdProducto { get; set; }

    [Required]
    public string Codigo { get; set; } = null!;

    [Required]
    public string Nombre { get; set; } = null!;

    [Required]
    public string? Descripcion { get; set; }

    [Required]
    public int Cantidad { get; set; }

    [Required]
    public int CategoriaId { get; set; }

    public string? Imagen { get; set; }

    [Required]
    public decimal Precio { get; set; }

    [Required]
    public int CaracteristicaId1 { get; set; }

    public int? CaracteristicaId2 { get; set; }

    [JsonIgnore]
    public virtual Caracteristica CaracteristicaId1Navigation { get; set; } = null!;
    [JsonIgnore]
    public virtual Caracteristica? CaracteristicaId2Navigation { get; set; }
    [JsonIgnore]
    public virtual Categoria Categoria { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<DetalleCarrito> DetalleCarritos { get; set; } = new List<DetalleCarrito>();
    [JsonIgnore]
    public virtual ICollection<DetalleListaDeseo> DetalleListaDeseos { get; set; } = new List<DetalleListaDeseo>();
    [JsonIgnore]
    public virtual ICollection<DetalleOrden> DetalleOrdens { get; set; } = new List<DetalleOrden>();
}
