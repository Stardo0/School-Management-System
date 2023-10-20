const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Initialisieren Sie Firebase mit Ihrer Firebase-Konfigurationsdatei
const serviceAccount = require('path/to/your/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware für das Parsen von Anfragen
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Anmelderoute
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  admin.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Erfolgreich angemeldet
      res.send('Erfolgreich angemeldet');
    })
    .catch((error) => {
      // Fehler bei der Anmeldung
      res.status(401).send('Fehler bei der Anmeldung');
    });
});

// Starten Sie Ihren Server
app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});
