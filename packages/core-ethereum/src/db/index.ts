import { BasicDB } from "./basic-db.js";
import { ICoreEthereumDB } from "./interfaces.js";

/**
 * DB specifically for core-ethreum pacakge. It extends the universal DB definiton
 * and implements interfaces for core-ethereum
 */
export class CoreEthereumDB extends BasicDB implements ICoreEthereumDB {}