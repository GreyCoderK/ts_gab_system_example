import GAB from "../classes/gab";
import Config from "./config";
import ConfigDependenciesProvider from "./configDependenciesProvider";

export class SystemInitializer {
    static initialize(): { config: Config, gab: GAB } {
        const configDependencies = new ConfigDependenciesProvider();
        
        const config = Config.createInstance(configDependencies);
        
        const gab = new GAB(
            "Cocody", 
            configDependencies.createInitialBillets(), 
            config
        );

        return { config, gab };
    }
}