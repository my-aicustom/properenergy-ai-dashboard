@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js belum tersedia di PATH. Install Node.js versi 20+.
  pause
  exit /b 1
)
echo ==============================================
echo PROPER ENERGY - MEGA PATCH V4 LOCAL PREVIEW
echo ==============================================
echo Website redesign: http://127.0.0.1:4173/
echo Dashboard demo:   http://127.0.0.1:4173/demo/
echo.
echo Setelah server berjalan, buka alamat di atas.
echo Tekan Ctrl+C untuk menghentikan server.
echo Tidak ada commit/push ke GitHub.
echo.
node local-server/server.mjs
pause
