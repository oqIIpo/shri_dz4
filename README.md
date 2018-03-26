[Demo](http://shri-dz4-prod.herokuapp.com/)

# Инфраструктура

## Часть 1 - Проверка кода

`npm run lint`
Проверка кода осуществляется при помощи Eslint. Используется конфиг airbnb-base.
Переопределены некоторые правила.

`npm run test`
Тестирование при помощи jest.

## Часть 2 - сборка проекта.

Для сборки выбрал [parcel](https://parceljs.org/) по следующим причинам

* Слышал, что он zero configuration - звучало как то, что мне нужно в условиях столь сжатых сроков :)
* Было интересно попробовать этот инструмент

Оказалось, что parcel'ем дейсвительно очень просто собрать проект. Он из коробки безо всяких настроек может собирать js и css (включая препроцессоры, для сборки scss, к примеру достаточно установить node-sass), а так же HMR, опять же без единой строчки конфигурации. Сборщик подхватывает файлы конфигурации postcss и при сборке css прогоняет код через указанные плагины.
Parcel предоставляет middleware для node. Таким образом сборка в данном проекте настраивается всего тремя строчками кода

```
const Bundler = require("parcel-bundler");
const bundler = new Bundler(path.resolve(__dirname, "assets/index.js"));
app.use(bundler.middleware());
```

Если проект запускается в production окружении, бандлер минифицирует код.

Чтобы посмотреть как это работает нужно запустить проект командой `npm run dev`
При изменениях в js и scss файлах в директории `assets/` будет выполяться пересборка с логированием в консоль.

Главный минус сборщика - слабоватая документация.
