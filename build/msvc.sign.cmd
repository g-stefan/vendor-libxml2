@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

echo -^> sign vendor-libxml2

pushd temp\bin
call grigore-stefan.sign "LibXML2" "libxml2.dll"
call grigore-stefan.sign "LibXML2" "xmlcatalog.exe"
call grigore-stefan.sign "LibXML2" "xmllint.exe"
popd
