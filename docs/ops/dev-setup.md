# Dev Setup (WIP)

This repository contains three apps:

- API backend: `api/`
- Admin web app: `admin/`
- Mobile app (Flutter): `mobile/`

## API

```bash
cd api
docker compose up -d
npm install
npm run dev
```

## Admin

```bash
cd admin
npm install
npm run dev
```

## Mobile

Requires Flutter installed.

```bash
cd mobile
flutter pub get
flutter run
```
