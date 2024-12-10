import DepotInterface from "./depotInterface";
import HistoriqueInterface from "./historiqueInterface";
import LoginInterface from "./loginInterface";
import LogoutInterface from "./logoutInterface";
import RetraitInterface from "./retraitInterface";
import SoldeInterface from "./soldeInterface";
import GetValidationsInterface from "../validations/getValidationsInterface";

export default interface GABInterface extends GetValidationsInterface, LoginInterface, LogoutInterface, SoldeInterface, HistoriqueInterface, DepotInterface, RetraitInterface{
    getSolde(): number;
}