using Microsoft.EntityFrameworkCore;
using Models;
using DA;
using BL;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQL Server Connection
builder.Services.AddDbContext<ProyectoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQLServerConnection")
    ));

builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);

// Register DA and BL services
builder.Services.AddScoped<UsuarioDA>();
builder.Services.AddScoped<UsuarioBL>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
