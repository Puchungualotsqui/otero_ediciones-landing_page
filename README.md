# Otero Ediciones - Frontend

This is the **Angular** frontend for the Otero Ediciones landing page.  
It displays a dynamic book catalog and a brief history of the editorial.

## Built With

- Angular
- TypeScript
- HTML & CSS

## Available Routes

| Route                        | Component            | Description                                 |
|-----------------------------|----------------------|---------------------------------------------|
| `/`                         | `HomeComponent`      | Landing page with featured books            |
| `/catalogo`                 | `CatalogoComponent`  | Full book catalog with filters              |
| `/catalogo/:simplified_name`| `BookDetailComponent`| Individual book detail page                 |
| `/historia`                 | `HistoriaComponent`  | About us / company history section          |

## 📦 Project Structure Highlights
```
src/
├── app/
│ ├── catalogo/
│ ├── home/
│ ├── historia/
│ ├── book-detail/
│ └── ...
├── assets/
├── index.html
└── main.ts
```

## 🖼️ Features

- Responsive layout
- Home expositor with categorized rows
- Filterable catalog (level, subject, type, language, search)
- Dedicated book detail view
- Static 'Historia' page with editorial background
