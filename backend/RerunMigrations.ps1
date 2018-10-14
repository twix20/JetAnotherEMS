Remove-Item -Path .\JetAnotherEMS.Infrastructure.Data\Migrations -Force -Recurse
Remove-Item -Path .\JetAnotherEMS.Infrastructure.Identity\Migrations -Force -Recurse

dotnet ef migrations add InitialCreate --startup-project JetAnotherEMS.Infrastructure.Data --project JetAnotherEMS.Infrastructure.Data --context JetAnotherEmsContext
dotnet ef migrations add InitialCreate --startup-project JetAnotherEMS.Infrastructure.Data --project JetAnotherEMS.Infrastructure.Data --context EventStoreSQLContext
dotnet ef migrations add InitialCreate --startup-project JetAnotherEMS.Infrastructure.Identity --project JetAnotherEMS.Infrastructure.Identity --context ApplicationDbContext

dotnet ef database update --startup-project JetAnotherEMS.Infrastructure.Data --project JetAnotherEMS.Infrastructure.Data --context JetAnotherEmsContext
dotnet ef database update --startup-project JetAnotherEMS.Infrastructure.Data --project JetAnotherEMS.Infrastructure.Data --context EventStoreSQLContext
dotnet ef database update --startup-project JetAnotherEMS.Infrastructure.Identity --project JetAnotherEMS.Infrastructure.Identity --context ApplicationDbContext

