import { Carte } from "../classes/carte";
import Historique from "../classes/historique";
import Transaction from "../classes/transaction";
import ConfigDependenciesInterface from "../interfaces/config/configDependenciesInterface";
import ConfigInterface from "../interfaces/config/configInterface";
import GABInterface  from "../interfaces/handlers/gabInterface";

export default class Config implements ConfigInterface{
    static #instance: Config;

    private _gab: GABInterface|null=null;
    private _cartes: Carte[];
    private _historiques: Historique[] = [];
    private _transactions: Transaction[] = [];
    private _configDependencies: ConfigDependenciesInterface;

    private constructor(configDependencies: ConfigDependenciesInterface) {
        this._configDependencies = configDependencies;
        this._cartes = configDependencies.createInitialCartes();
    }

    public static createInstance(configDependencies: ConfigDependenciesInterface): Config {
        if (!Config.#instance) {
            Config.#instance = new Config(configDependencies);
        }
        
        return Config.#instance;
    }

    public setGAB(gab: GABInterface|null) {
        this._gab = gab;
    }

    public getGAB(): GABInterface|null {
        return this._gab;
    }

    public getCartes(): Carte[] {
        return this._cartes;
    }

    public get historiques(): Historique[] {
        return this._historiques;
    }

    public get transactions(): Transaction[] {
        return this._transactions;
    }

    public addTransaction(transaction: Transaction) {
        this._transactions.push(transaction);
    }

    public addHistorique(historique: Historique) {
        this._historiques.push(historique);
    }

    public getHistoriques(dateDebut: Date, dateFin: Date | null): Transaction[] {
        return this._transactions.filter((historique) => {
            const historiqueDate = new Date(historique.date);
            return (
                historiqueDate >= dateDebut &&
                (dateFin === null || historiqueDate <= dateFin)
            );
        });
    }
}
