import {Client} from "./client.model";
import {Entrepreneur} from "./entrepreneur.model";

export interface Devis {
  devisId: number;
  devisName: string;
  devisDescription: string;
  total: number;
  client: Client;
  entrepreneur: Entrepreneur
}
