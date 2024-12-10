import { Carte } from "../../classes/carte";
import Billet from "../../utils/billet";

export default interface ConfigDependenciesInterface {
    createInitialBillets(): Billet[];
    createInitialCartes(): Carte[];
}