using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };

    options.Events = new JwtBearerEvents
    {
        OnChallenge = context =>
        {
            // Skip the default logic.
            context.HandleResponse();

            //context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            //context.Response.ContentType = "application/json";

            // Use context.HttpContext.WriteAsync to write the result.
            return context.Response.WriteAsync(JsonSerializer.Serialize(new { error = "You are not authorized." }));
        },
        OnAuthenticationFailed = context =>
        {
            var errorMessage = "An unknown error occurred.";

            if (context.Exception is SecurityTokenInvalidIssuerException)
            {
                errorMessage = "The token's issuer is invalid.";
            }
            else if (context.Exception is SecurityTokenInvalidAudienceException)
            {
                errorMessage = "The token's audience is invalid.";
            }
            // Add more if statements here as needed to handle different exceptions.

            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json";

            return context.Response.WriteAsync(JsonSerializer.Serialize(new { error = errorMessage }));
        }
    };
});


var policyName = "defaultCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(policyName, builder =>
    {
        builder.WithOrigins("http://localhost:4200") // the Angular app url
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors(policyName);

app.MapControllers();

app.Run();
