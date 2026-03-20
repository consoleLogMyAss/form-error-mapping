---
description: Создание нового Angular компонента по специфической схеме проекта
---

При получении команды на создание компонента (например, "Создай компонент [name]"), строго следуй этой инструкции:

### 1. Структура папок
Создавай компонент в директории `src/app/components/[name]`.
Структура должна быть следующей:
- `[name]/`
  - `imports/`
    - `index.ts`
  - `[name].component.ts`
  - `[name].component.html`
  - `[name].component.scss`

### 2. Шаблоны файлов

#### imports/index.ts
Имя константы должно быть `[PascalCaseName]Imports`.
```typescript
import { Type, Provider } from '@angular/core';

export const [PascalCaseName]Imports: Type<unknown>[] = [];
export const [PascalCaseName]Providers: Provider[] = [];
```

#### [name].component.ts
- Селектор: `[name]`
- `standalone: true`
- Импорт константы из папки `./imports`
- Стратегия: `ChangeDetectionStrategy.OnPush`
- Содержание класса: пустое (по умолчанию)

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { [PascalCaseName]Imports, [PascalCaseName]Providers } from './imports';

@Component({
  selector: '[name]',
  imports: [PascalCaseName]Imports,
  providers: [PascalCaseName]Providers,
  templateUrl: './[name].component.html',
  styleUrl: './[name].component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class [PascalCaseName]Component {}
```

#### [name].component.html
```html
<p>[name] works!</p>
```

#### [name].component.scss
```scss
:host {
  display: block;
}
```

### 3. Правила именования
- `[name]` — kebab-case (например, `my-cool-component`)
- `[PascalCaseName]` — PascalCase (например, `MyCoolComponent`)
