import {Entrepreneur} from "./entrepreneur.model";
import {Client} from "./client.model";

export interface Facture {
  factureId: number;
  factureName: string;
  factureDescription: string;
  total: number;
  client: Client;
  entrepreneur: Entrepreneur
}
