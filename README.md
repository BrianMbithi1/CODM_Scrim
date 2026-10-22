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
npm run server   
npm start        
npm test        
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
- Frontend (GitHub Pages): https://brianmbithi1.github.io/CODM_Scrim/login.html
- API (Render, free tier): https://codm-scrim.onrender.com

Note: the free Render tier has an ephemeral filesystem, so API data resets when the
server restarts or spins down after inactivity. A paid persistent disk would remove
this limitation (set DATA_DIR to the disk's mount path).
