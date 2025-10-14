# Troubleshooting Wiki

## Проблема: Страницы не загружаются из-за ошибок mockData

### Симптомы:
- Страницы показывают белый экран или не загружаются
- В консоли браузера ошибки типа "Cannot read properties of undefined"
- Ошибки связанные с `mockData.something.map()` или `mockData.path.property`

### Возможные причины:
1. **Неправильные пути к данным в mockData**
2. **Отсутствующие свойства в структуре данных**
3. **Неправильное использование методов массивов (map, filter) на undefined**

### Решение:

#### Шаг 1: Диагностика
```bash
# Проверить какие ошибки в консоли браузера
# Открыть Developer Tools > Console

# Проверить локально
cd frontend && npm run dev
# Открыть http://localhost:5173/проблемная-страница
```

#### Шаг 2: Найти проблемный код
```bash
# Поиск использования mockData в проблемной странице
grep -n "mockData\." src/pages/path/ProblemPage.jsx

# Поиск методов массивов
grep -n "\.map\|\.filter\|\.forEach" src/pages/path/ProblemPage.jsx
```

#### Шаг 3: Проверить структуру данных
```bash
# Посмотреть содержимое mockData
cat src/data/mockData.js | grep -A 10 -B 2 "объект_который_используется"
```

#### Шаг 4: Исправить код
**Вариант A: Добавить отсутствующие данные**
```javascript
// В src/data/mockData.js добавить недостающие свойства
export const mockData = {
  // ...существующие данные
  problemSection: {
    title: "Title",
    items: [
      { name: "Item 1", value: "Value 1" },
      { name: "Item 2", value: "Value 2" }
    ]
  }
};
```

**Вариант B: Добавить защиту от ошибок**
```javascript
// В компоненте использовать optional chaining и fallback
{mockData.section?.items?.map((item, index) => (
  <div key={index}>{item.name}</div>
)) || (
  <div>Данные загружаются...</div>
)}
```

#### Шаг 5: Тестирование
```bash
# Локальное тестирование
npm run dev  # Проверить http://localhost:5173

# Сборка для продакшена
npm run build  # Убедиться что нет ошибок

# Preview сборки
npm run preview  # Проверить http://localhost:4173
```

#### Шаг 6: Деплой
```bash
# Коммит исправлений
git add -A
git commit -m "Fix mockData structure for PageName"

# Деплой
git push origin main

# Проверка через 1-2 минуты
curl -I https://www.softdab.tech/проблемная-страница
```

### Конкретные примеры исправлений:

#### 1. AboutPage - неправильный путь к команде
**Проблема:** `mockData.team.map()` 
**Решение:** `mockData.about?.team?.map()`

#### 2. CustomDevelopmentPage - неправильная структура
**Проблема:** `mockData.services.customDevelopment`
**Решение:** `mockData.customDevelopment`

#### 3. DedicatedTeamsPage - отсутствующие данные
**Проблема:** `mockData.dedicatedTeams.teamSizes.map()` - teamSizes не существует
**Решение:** Добавить в mockData.js:
```javascript
dedicatedTeams: {
  // ...existing properties
  teamSizes: [
    {
      size: "Small Team",
      monthlyRate: "$8,000",
      bestFor: "MVPs and small projects"
    }
    // ...more sizes
  ]
}
```

### Типовые ошибки в коде:

#### ❌ Неправильно:
```javascript
const service = mockData.services.customDevelopment; // неправильный путь
{mockData.team.map(...)} // team не в корне mockData
{service.items.map(...)} // items может не существовать
```

#### ✅ Правильно:
```javascript
const service = mockData.customDevelopment; // правильный путь
{mockData.about?.team?.map(...)} // optional chaining
{service?.items?.map(...) || <div>No items</div>} // с fallback
```

### Быстрая диагностика:
1. **Белый экран** → проверить Console в DevTools
2. **Ошибка "Cannot read properties"** → проверить пути mockData
3. **Ошибка "map is not a function"** → проверить что свойство является массивом
4. **403/404 на продакшене** → проблема деплоя, сделать cache clear и redeploy

### Dev/Production workflow:
1. **Создать dev ветку:** `git checkout -b dev`
2. **Тестировать локально:** `npm run dev`
3. **Исправить проблемы в dev**
4. **Слить в main:** `git checkout main && git merge dev && git push origin main`
5. **Ждать деплой 1-2 минуты**

---

## История решенных проблем:

### 14.10.2025 - Исправление структуры mockData
- **Проблемы:** AboutPage, CustomDevelopmentPage, DedicatedTeamsPage не загружались
- **Причина:** Неправильные пути к данным и отсутствующие свойства в mockData
- **Решение:** Обновлена структура mockData.js, добавлены недостающие данные
- **Коммиты:** 14e6d2d, 40a9154, f9cd961, 511562e

### Проблемы с деплоем:
- **403 Forbidden** - решается cache clear + redeploy
- **FIN packet error** - проблемы сети, повторить через минуту