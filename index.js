```javascript
const express = require('express');
const app = express();
app.use(express.json());

let devices = new Map();

app.post('/register', (req, res) => {
    const { id, device_name, battery } = req.body;
    devices.set(id, { device_name, battery, last_seen: new Date().toISOString() });
    res.json({ status: 'ok' });
});

app.get('/devices', (req, res) => {
    const list = [];
    for (let [id, data] of devices) list.push({ id, ...data });
    res.json(list);
});

app.get('/ping', (req, res) => {
    res.json({ status: 'alive', time: new Date().toISOString() });
});

app.listen(3000, () => console.log('Server running'));
```
