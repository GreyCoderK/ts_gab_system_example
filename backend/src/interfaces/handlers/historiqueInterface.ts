import Transaction from "../../classes/transaction";

export default interface HistoriqueInterface {
    getHistoriques(dateDebut:Date, dateFin:Date|null): Transaction[];
}