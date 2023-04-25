import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, setDoc, addDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentData, DocumentReference } from '@firebase/firestore';
import { firstValueFrom } from 'rxjs';
import { ItemInterface } from '../../interfaces/item.interface';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T extends ItemInterface = any> {
    protected abstract readonly itemType: string;

    constructor(protected firestore: Firestore) {}

    protected getQuery() {
        return collection(this.firestore, this.itemType) as CollectionReference<T>;
    }

    protected getReference(id: string) {
        return doc(this.firestore, this.itemType, id) as DocumentReference<T>;
    }

    public getItemObservable(id: string) {
        return docData<T>(this.getReference(id), { idField: 'id' });
    }
    public getItemsObservable() {
        return collectionData<T>(this.getQuery(), { idField: 'id' });
    }

    public getItem(id: string) {
        return firstValueFrom(this.getItemObservable(id));
    }

    public getItems() {
        return firstValueFrom(this.getItemsObservable());
    }

    public async setItem(item: Partial<T>) {
        if (item) {
            if (item.id) {
                return await this.updateItem(item);
            } else {
                return await this.addItem(item);
            }
        }
        return item;
    }

    public async addItem(item: Partial<T>) {
        item.id = (await addDoc<DocumentData>(this.getQuery(), item)).id;
        return item;
    }

    public async updateItem(item: Partial<T>) {
        await setDoc<DocumentData>(this.getReference(item.id as string), item);
        return item;
    }
}
