import express, { Request, Response }  from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import DepotHandler from './handlers/depotHandler';
import HistoriqueHandler from './handlers/historiqueHandler';
import SoldeHandler from './handlers/soldeHandler';
import LogoutHandler from './handlers/logoutHandler';
import LoginHandler from './handlers/loginHandler';
import RetraitHandler from './handlers/retraitHandler';
import { SystemInitializer } from './config/systemInitializer';
import { AUTH_FAIL } from './utils/constante';

const app = express();
const port = 3000;

const { config, gab } = SystemInitializer.initialize();

app.use(cors());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json()); 


app.get('/', (req, res) => {
  res.send("Hello world");
});

app.post('/', (req: Request, res: Response) => {
  try {
    const {action} = req.body;
    let result;
  
    switch (action) {
      case "Depot":
        result = (
          new DepotHandler(gab)
        ).handler({
          montant: req.body.montant
        });
        break;
      case "Retrait":  
        result = (
          new RetraitHandler(gab)
        ).handler({
          montant: req.body.montant
        });
        break;
      case "Historique":  
        result = (
          new HistoriqueHandler(gab)
        ).handler({
          dateDebut: new Date(req.body.dateDebut),
          dateFin: new Date(req.body.dateFin) || null
        });
        break;
      case "Solde": 
        result = (
          new SoldeHandler(gab)
        ).handler({});
        break;
      case "Logout":
        result = (
          new LogoutHandler(gab)
        ).handler({message: "User logout"});  
        break;
      case "Login":  
      default:
        const {pin, carte} = req.body;
        if(pin == '' || carte == ''){
          throw new Error(AUTH_FAIL);
        }
        result = (
          new LoginHandler(gab)
        ).handler({pin, carte});
        break;
    }
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({message: error.message });
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

