import { Carte, CarteCourantElite, CarteCourantLiberty, CarteEpargne } from "../classes/carte";
import Compte from "../classes/compte";
import ConfigDependenciesInterface from "../interfaces/config/configDependenciesInterface";
import Billet from "../utils/billet";

export default class ConfigDependenciesProvider implements ConfigDependenciesInterface {
    createInitialBillets(): Billet[] {
        return [
            new Billet("1000", "700"),
            new Billet("2000", "50000"),
            new Billet("5000", "20000"),
            new Billet("10000", "70000"),
        ];
    }

    createInitialCartes(): Carte[] {
        return [
            new CarteCourantElite(
                "9621", 
                "4916171222144954", 
                new Compte({solde:6595154})
            ),
            new CarteCourantLiberty(
                "1915", 
                "5392639410132039", 
                new Compte({solde:5921937})
            ),
            new CarteEpargne(
                "3792", 
                "4548545450132039", 
                new Compte({solde:129922545})
            ),
            new CarteCourantLiberty(
                "7195", 
                "5392639465335755", 
                new Compte({solde:352198333})
            )
        ];
    }
}