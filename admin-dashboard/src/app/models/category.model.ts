export interface Category {
  id: string;
  name: string;
  medications?: string[];       // References to Medication IDs
}
