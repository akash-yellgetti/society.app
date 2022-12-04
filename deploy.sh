sudo rm -rf dist
sudo rm -rf ../../../../goddress/prod/volumes/sociosafety/ng/*
ng build --prod
sudo cp -r dist/sociosafety/. ../../../../goddress/prod/volumes/sociosafety/ng/.
sudo subl ../../../../goddress/