$env:DATABASE_CONNECTION = "Server=localhost,1433;Database=JetAnotherEMS;User=sa;Password=Your_password123;"

"The actions gonna be performed against:"
Get-Childitem env:DATABASE_CONNECTION

"Removing migration folders"
Remove-Item -Path .\JetAnotherEMS.Infrastructure.Data\Migrations -Force -Recurse -ErrorAction Ignore
Remove-Item -Path .\JetAnotherEMS.Infrastructure.Identity\Migrations -Force -Recurse -ErrorAction Ignore

"Droping database"
dotnet ef database drop --force --startup-project JetAnotherEMS.Infrastructure.Data --project JetAnotherEMS.Infrastructure.Data --context JetAnotherEmsContext

"Creating initial migrations"
dotnet ef migrations add InitialCreate --startup-project JetAnotherEMS.Infrastructure.Data --project JetAnotherEMS.Infrastructure.Data --context JetAnotherEmsContext
dotnet ef migrations add InitialCreate --startup-project JetAnotherEMS.Infrastructure.Data --project JetAnotherEMS.Infrastructure.Data --context EventStoreSQLContext
dotnet ef migrations add InitialCreate --startup-project JetAnotherEMS.Infrastructure.Identity --project JetAnotherEMS.Infrastructure.Identity --context ApplicationDbContext

"Updating database"
dotnet ef database update --startup-project JetAnotherEMS.Infrastructure.Data --project JetAnotherEMS.Infrastructure.Data --context JetAnotherEmsContext
dotnet ef database update --startup-project JetAnotherEMS.Infrastructure.Data --project JetAnotherEMS.Infrastructure.Data --context EventStoreSQLContext
dotnet ef database update --startup-project JetAnotherEMS.Infrastructure.Identity --project JetAnotherEMS.Infrastructure.Identity --context ApplicationDbContext

