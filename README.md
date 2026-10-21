# CODM Scrim Manager

Track Call of Duty Mobile scrims and tournament matches, and see win rates by mode and map. Players and teams register, log in, and see only their own data.

## Objectives
- Full CRUD through a REST API (GET, POST, PUT, PATCH, DELETE)
- Authentication with JWT (json-server-auth)
- Public API integration (REST Countries) for team/player country and flag
- Modular JS, Jest tests (50%+ coverage), responsive semantic HTML

## Setup
```bash
npm install
npm run server   # API on http://localhost:3000
npm start        # frontend on http://localhost:8080
npm test         # Jest with coverage
```
Set `BASE_URL` in `js/config.js` to your deployed API before deploying the frontend.

## Technologies
HTML, CSS, JavaScript (ES modules), JSON Server 0.17.4, json-server-auth, Jest.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| POST | /register | Create account |
| POST | /login | Get access token |
| GET | /matches?userId=:id | List own matches |
| POST | /matches | Create match |
| PUT | /matches/:id | Replace match |
| PATCH | /matches/:id | Update status/score |
| DELETE | /matches/:id | Delete match |

Public API: https://restcountries.com

## Deployment
- Frontend (GitHub Pages): _add link_
- API (host with persistent disk): _add link_

