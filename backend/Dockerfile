FROM microsoft/dotnet:2.2-aspnetcore-runtime-alpine AS base
WORKDIR /app
EXPOSE 52390
EXPOSE 44364

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY JetAnotherEMS.WebApi/JetAnotherEMS.WebApi.csproj JetAnotherEMS.WebApi/
COPY JetAnotherEMS.Infrastructure.IoC/JetAnotherEMS.Infrastructure.IoC.csproj JetAnotherEMS.Infrastructure.IoC/
COPY JetAnotherEMS.Infrastructure.Bus/JetAnotherEMS.Infrastructure.Bus.csproj JetAnotherEMS.Infrastructure.Bus/
COPY JetAnotherEMS.Domain.Core/JetAnotherEMS.Domain.Core.csproj JetAnotherEMS.Domain.Core/
COPY JetAnotherEMS.Application/JetAnotherEMS.Application.csproj JetAnotherEMS.Application/
COPY JetAnotherEMS.Infrastructure.Identity/JetAnotherEMS.Infrastructure.Identity.csproj JetAnotherEMS.Infrastructure.Identity/
COPY JetAnotherEMS.Domain/JetAnotherEMS.Domain.csproj JetAnotherEMS.Domain/
COPY JetAnotherEMS.Infrastructure.Data/JetAnotherEMS.Infrastructure.Data.csproj JetAnotherEMS.Infrastructure.Data/
COPY JetAnotherEMS.sln .
RUN dotnet restore
COPY . .
WORKDIR /src/JetAnotherEMS.WebApi
RUN dotnet build JetAnotherEMS.WebApi.csproj -c Release -o /JetAnotherEMS.WebApi

FROM build AS publish
RUN dotnet publish JetAnotherEMS.WebApi.csproj -c Release -o /JetAnotherEMS.WebApi

FROM base AS final
WORKDIR /app
COPY --from=publish /JetAnotherEMS.WebApi /JetAnotherEMS.WebApi

WORKDIR /JetAnotherEMS.WebApi
ENTRYPOINT ["dotnet", "JetAnotherEMS.WebApi.dll"]
