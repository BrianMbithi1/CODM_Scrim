import fs from 'fs';
import path from 'path';
import jsonServer from 'json-server';
import auth from 'json-server-auth';


const dataDir = process.env.DATA_DIR || '.';
const dbFile = path.join(dataDir, 'db.json');
if (!fs.existsSync(dbFile)) fs.copyFileSync('db.json', dbFile);

const app = jsonServer.create();
const router = jsonServer.router(dbFile);
app.db = router.db;

const rules = auth.rewriter(JSON.parse(fs.readFileSync('routes.json', 'utf8')));

app.use(jsonServer.defaults({ logger: false }));
app.use(rules);
app.use(auth);
app.use(router);

app.listen(process.env.PORT || 3000, () => console.log('API running'));