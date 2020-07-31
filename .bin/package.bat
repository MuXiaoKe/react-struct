cd ..\..
set currentPath=%cd%
rd /s/q %currentPath%\static\dist
del /q %currentPath%\static\index.html
copy %currentPath%\development\dist\production\index.html %currentPath%\static
xcopy %currentPath%\development\dist %currentPath%\static\dist /s/e/i/y
@echo over