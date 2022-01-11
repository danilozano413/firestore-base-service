import { DocumentData } from '@firebase/firestore';

export interface ItemInterface extends DocumentData {
    id?: string;
}
