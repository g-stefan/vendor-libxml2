@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

rem --- make

cmd.exe /C build\msvc.make.cmd
if errorlevel 1 exit 1

rem ---

if not exist "%INSTALL_PATH_BIN%\" mkdir "%INSTALL_PATH_BIN%"
copy /Y /B "temp\bin\libxml2.dll" "%INSTALL_PATH_BIN%\libxml2.dll"
copy /Y /B "temp\bin\xmlcatalog.exe" "%INSTALL_PATH_BIN%\xmlcatalog.exe"
copy /Y /B "temp\bin\xmllint.exe" "%INSTALL_PATH_BIN%\xmllint.exe"

rem --- dev

if not exist "%INSTALL_PATH_DEV%\" mkdir "%INSTALL_PATH_DEV%"
if not exist "%INSTALL_PATH_DEV%\bin" mkdir "%INSTALL_PATH_DEV%\bin"
if not exist "%INSTALL_PATH_DEV%\include" mkdir "%INSTALL_PATH_DEV%\include"
if not exist "%INSTALL_PATH_DEV%\lib" mkdir "%INSTALL_PATH_DEV%\lib"
copy /Y /B "temp\bin\libxml2.dll" "%INSTALL_PATH_DEV%\bin\libxml2.dll"
copy /Y /B "temp\bin\xmlcatalog.exe" "%INSTALL_PATH_DEV%\bin\xmlcatalog.exe"
copy /Y /B "temp\bin\xmllint.exe" "%INSTALL_PATH_DEV%\bin\xmllint.exe"
xcopy /Y /S /E "temp\include\libxml2\libxml\" "%INSTALL_PATH_DEV%\include\libxml\"
copy /Y /B "temp\lib\libxml2.lib" "%INSTALL_PATH_DEV%\lib\libxml2.lib"
copy /Y /B "temp\lib\libxml2_a.lib" "%INSTALL_PATH_DEV%\lib\libxml2_a.lib"
copy /Y /B "temp\lib\libxml2_a_dll.lib" "%INSTALL_PATH_DEV%\lib\libxml2_a_dll.lib"
copy /Y /B "temp\lib\libxml2.lib" "%INSTALL_PATH_DEV%\lib\libxml2.static.lib"
