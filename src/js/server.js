const http = require('http');
const port = process.env.PORT || 7070;
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const WS = require('ws');
const contacts = [];

const app = new Koa();
app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true
}));


app.use(async (ctx) => { 
  const method  = ctx.request.querystring;
  const newName = ctx.request.body.text;
  
  switch (method) {
    case 'method=getName':
      if (!contacts.find(a => a === newName)) {
        contacts.push(newName);
        ctx.response.body = {response: contacts, name: newName};
      } else {
        ctx.response.body = {response: `Псевдоним ${newName} уже занят`};
      }
      return;
    
    case 'method=removeUser':
      const removeUser = ctx.request.body.key
      const removeUserIndex = contacts.findIndex(a => a === removeUser);
      if (removeUserIndex !== -1) contacts.splice(removeUserIndex, 1);
      return;

    default:
      ctx.response.status = 404;
      return;
    }
});

const server = http.createServer(app.callback());
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws, req) => {
  const errCallback = (err) => {
    if (err) {
      // TODO: handle error
    }
  }

  ws.on('message', msg => {
    Array.from(wsServer.clients).filter(a => a.readyState === WS.OPEN).forEach(o => o.send(msg.toString(), errCallback));
  });
  
  ws.send(JSON.stringify({welcome: 'welcome'}), errCallback);
});

server.listen(port);
