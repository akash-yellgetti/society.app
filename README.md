# Sociosafety

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).




https://www.techiediaries.com/angular-material-navigation-toolbar-sidenav/


<!-- Services -->
ng g s core/api/maintenance/maintenance
ng g s core/api/profile/profile

ng g s core/api/form/form
ng g s core/api/payment/payment
ng g s core/api/auth/payauthment
ng g s core/api/common/common

ng g s core/services/loader
ng g s core/services/utilities
ng g s core/services/form


ng generate pipe core/pipes/sanitize-html/sanitize-html --module=modules/admin

<!-- Component -->
ng g c modules/field/field-datetime
ng g c modules/field/field-ckEditor
ng g c modules/field/field-select-ajax --module=field
ng g c modules/field/field-select-sql --module=field
ng g c modules/field/field-file --module=field
ng g c modules/field/field-file --module=field
ng g c modules/field/field-monacoEditor --module=field
ng g c modules/field/field-aceEditor --module=field

ng g c modules/communication/group



ng g c modules/auth/forgot-password --module=auth


ng g c modules/layout/breadcrumb

ng g c modules/user/work-experience
ng g c modules/user/chat

ng g c modules/admin/payment
ng g c modules/admin/payment-info  --module=admin

ng g c modules/layout/main-sidenav-menu --module=layout

ng g m modules/maintenance --routing=true
ng g c modules/maintenance/maintenance-template --module=maintenance
ng g c modules/maintenance/maintenance-generate --module=maintenance





ng g m modules/formBuilder --routing=true

ng g c modules/form-builder/builder --module=form-builder
ng generate pipe SanitizeHtml

ng g c modules/layout/shared/header --module=layout
ng g c modules/layout/shared/footer --module=layout
ng g c modules/layout/shared/sidenav --module=layout
ng g c modules/layout/shared/sidenav-chat --module=layout
ng g c modules/layout/shared/sidenav-menu --module=layout




ng g m modules/society --routing=true
ng g c modules/society/dashboard --module=society


Copied sidenav logic and css
https://stackblitz.com/edit/material-sidenav-example-zzxfjf?file=app%2Fsidenav-autosize-example.html


https://stackblitz.com/edit/dynamic-nested-sidenav-menu?file=app%2Fmenu-list-item%2Fmenu-list-item.component.ts


# insert the new value into the system config
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# check that the new value was applied
cat /proc/sys/fs/inotify/max_user_watches

# config variable name (not runnable)
fs.inotify.max_user_watches=524288

sudo sysctl -p




export ANDROID_HOME=/home/akash/Android/Sdk
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
export ANDROID_SDK_ROOT=/home/akash/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools



export JAVA_HOME="/opt/jdk1.12.0"
export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"
export PATH=$PATH:$JAVA_HOME/bin
export GRADLE_HOME=/opt/gradle/gradle-5.0
export PATH=${GRADLE_HOME}/bin:${PATH}


export ANDROID_HOME=/home/akash/Android/Sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools

<!-- convert css to scss -->
https://javascript.plainenglish.io/step-by-step-guide-to-upgrade-your-angular-app-from-css-to-scss-fb347330fe28


sudo rm -rf dist
sudo rm -rf ../../../../goddress/prod/volumes/sociosafety/ng/*
ng build --prod
sudo cp -r dist/sociosafety/. ../../../../goddress/prod/volumes/sociosafety/ng/.
sudo subl ../../../../goddress/