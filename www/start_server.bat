@echo off
cls
echo ========================================
echo RT TOURISTIQUE - Démarrage du Serveur
echo ========================================
echo.

REM Vérifier si Python est installé
python --version >nul 2>&1
if errorlevel 1 (
    echo Python n'est pas installé ou n'est pas dans le PATH
    echo Vérifiez votre installation de Python
    pause
    exit /b 1
)

REM Se déplacer dans le répertoire du projet
cd /d "%~dp0"

REM Démarrer le serveur
echo.
echo Le serveur démarre sur http://localhost:8000
echo Appuyez sur Ctrl+C pour arrêter le serveur
echo.
python -m http.server 8000

pause
