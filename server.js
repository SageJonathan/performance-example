const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}

  app.get('/', (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(4000);
  res.send(`Beep beep beep! ${process.pid}`);
});

if(cluster.isMaster){
  //Code here runs ONLY on start (Master)
  console.log('Master started')
  const NUM_WORKERS = os.cpus().length;
  for (let i =0; i<NUM_WORKERS; i++){
    cluster.fork();
  }
} else {
 //code here runs normally (Worker)
  console.log('Workers working')
  app.listen(3000);
}

