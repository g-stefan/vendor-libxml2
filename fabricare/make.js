// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022-2023 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

Fabricare.include("vendor");

messageAction("make");

if (Shell.fileExists("temp/build.done.flag")) {
	return;
};

if (!Shell.directoryExists("source")) {
	exitIf(Shell.system("7z x -aoa archive/" + Project.vendor + ".7z"));
	Shell.rename(Project.vendor, "source");
};

Shell.mkdirRecursivelyIfNotExists("output");
Shell.mkdirRecursivelyIfNotExists("output/bin");
Shell.mkdirRecursivelyIfNotExists("output/include");
Shell.mkdirRecursivelyIfNotExists("output/lib");
Shell.mkdirRecursivelyIfNotExists("temp");
Shell.mkdirRecursivelyIfNotExists("temp/bin");
Shell.mkdirRecursivelyIfNotExists("temp/include");
Shell.mkdirRecursivelyIfNotExists("temp/lib");

Shell.mkdirRecursivelyIfNotExists("temp/cmake");

if (!Shell.fileExists("temp/build.config.flag")) {
	Shell.setenv("CC","cl.exe");
	Shell.setenv("CXX","cl.exe");

	cmdConfig="cscript configure.js";
	cmdConfig+=" zlib=yes";
	cmdConfig+=" vcmanifest=yes";
	cmdConfig+=" debug=no";
	cmdConfig+=" static=no";
	cmdConfig+=" xml_debug=yes";
	cmdConfig+=" bindir="+Shell.realPath(Shell.getcwd())+"\\temp\\bin";
	cmdConfig+=" incdir="+Shell.realPath(Shell.getcwd())+"\\temp\\include";
	cmdConfig+=" libdir="+Shell.realPath(Shell.getcwd())+"\\temp\\lib";
	cmdConfig+=" sodir="+Shell.realPath(Shell.getcwd())+"\\temp\\bin";

	runInPath("source\\win32",function(){
		exitIf(Shell.system(cmdConfig));
	});

	Shell.filePutContents("temp/build.config.flag", "done");
};

runInPath("source\\win32",function(){
	exitIf(Shell.system("nmake /f Makefile.msvc"));
	exitIf(Shell.system("nmake /f Makefile.msvc install"));
	exitIf(Shell.system("nmake /f Makefile.msvc clean"));
});

Shell.system("del /F /Q temp\\bin\\test*");
Shell.system("del /F /Q temp\\bin\\run*");

exitIf(!Shell.copyFile("temp/bin/libxml2.dll", "output/bin/libxml2.dll"));
exitIf(!Shell.copyFile("temp/bin/xmlcatalog.exe", "output/bin/xmlcatalog.exe"));
exitIf(!Shell.copyFile("temp/bin/xmllint.exe", "output/bin/xmllint.exe"));

exitIf(!Shell.copyDirRecursively("temp/include", "output/include"));
exitIf(!Shell.copyDirRecursively("temp/include/libxml2", "output/include"));
exitIf(!Shell.copyDirRecursively("temp/lib", "output/lib"));

exitIf(!Shell.copyFile("temp/lib/libxml2.lib", "output/lib/libxml2.static.lib"));

Shell.filePutContents("temp/build.done.flag", "done");
