@echo off

REM Script to start Spring and .NET servers(run ./start_servers.bat in cl)

REM Start Spring server
echo Starting Spring server...
start cmd /k "cd /d D:\Proiect\Java Ticket Project\Java-Ticket-Project\target && java -jar ticketproject-0.0.1-SNAPSHOT.jar"

REM Start .NET server
echo Starting .NET server...
start cmd /k "cd /d D:\Proiect\C# Ticket Project\TicketManagmentSystem.Api && dotnet run"

echo Servers started.