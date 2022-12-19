using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.IdentityModel.Tokens;
using tourmaline.Services;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

// Add services to the container.

services.AddControllersWithViews();
services.Configure<FormOptions>(options => { options.MemoryBufferThreshold = int.MaxValue; });
services.AddCors(o => o.AddPolicy("AllowLocalDebug",
    b =>
    {
        b.WithOrigins("https://localhost:3000", "http://w42g13.int3306.freeddns.org")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(host => true)
            .AllowCredentials();
    }));

#region Setup connection

var connHostNameEnv = Environment.GetEnvironmentVariable("MYSQL_SERVICE_HOST");
var connHostPortEnv = Environment.GetEnvironmentVariable("MYSQL_SERVICE_PORT");

var connString = $"Server={connHostNameEnv ?? "localhost"};" +
<<<<<<< Updated upstream
                 $"User ID=root;Password=123321asdson;" +
                 $"Port={connHostPortEnv ?? "3306"};" +
                 $"Database=tourmaline;";
                 
=======
                 $"User ID=root;Password=Nalquin4599!;" +
                 $"Port={connHostPortEnv ?? "3306"};" +
                 $"Database=tourmaline;";
>>>>>>> Stashed changes

var database = new Database(connString);
services.AddSingleton(_ => database);
services.AddSingleton<SongServices>(_ => new SongServices(database));
services.AddSingleton<UserServices>(_ => new UserServices(database));
services.AddSingleton<RecentServices>(_ => new RecentServices(database));
services.AddSingleton<FavoriteServices>(_ => new FavoriteServices(database));
services.AddSingleton<PlaylistServices>(_ => new PlaylistServices(database));
services.AddSingleton<CommentServices>(_ => new CommentServices(database));
services.AddSingleton<SearchServices>(_ => new SearchServices(database));
services.AddSingleton<FollowServices>(_ => new FollowServices(database));
services.AddSingleton<SuggestionServices>(_ => new SuggestionServices(database));
services.AddSingleton<FeedServices>(_ => new FeedServices(database));

#endregion

services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = configuration["Jwt:Issuer"],
        ValidAudience = configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
});
services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
else
    app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowLocalDebug");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllerRoute(
    "default",
    "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();