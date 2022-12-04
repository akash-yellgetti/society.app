rm -rf ../mobile-app/sociosafety/www/*
rm -rf ../goddress/prod/volumes/sociosafety/ng/*
cp -r dist/sociosafety/. ../goddress/prod/volumes/sociosafety/ng/.
cp -r dist/sociosafety/. ../mobile-app/sociosafety/www/.
cd ../mobile-app/sociosafety/