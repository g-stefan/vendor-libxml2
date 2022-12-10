// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

exitIf(!Shell.copyFile("output/bin/libxml2.dll", pathRepository + "/bin/libxml2.dll"));
exitIf(!Shell.copyFile("output/bin/xmlcatalog.exe", pathRepository + "/bin/xmlcatalog.exe"));
exitIf(!Shell.copyFile("output/bin/xmllint.exe", pathRepository + "/bin/xmllint.exe"));

exitIf(!Shell.copyDirRecursively("output/include", pathRepository + "/include"));
exitIf(!Shell.copyDirRecursively("output/include/libxml2", pathRepository + "/include"));
exitIf(!Shell.copyDirRecursively("output/lib", pathRepository + "/lib"));

exitIf(!Shell.copyFile("output/lib/libxml2.lib", pathRepository + "/lib/libxml2.static.lib"));
