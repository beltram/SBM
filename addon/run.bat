call "addon-sdk\bin\activate.bat"
cd core
call cfx xpi
wget --post-file=smartbrowsermotionner.xpi http://localhost:8888/