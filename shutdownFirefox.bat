@echo off
tasklist | findstr -i firefox.exe
if %errorlevel% EQU 0 taskkill /f /im firefox.exe 
exit