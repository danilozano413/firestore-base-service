import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, setDoc, addDoc } from '@angular/fire/firestore';
import { DocumentData } from '@firebase/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { ItemInterface } from '../../interfaces/item.interface';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T extends ItemInterface = any> {
    protected abstract readonly itemType: string;

    constructor(protected firestore: Firestore) {}

    protected getQuery() {
        return collection(this.firestore, this.itemType);
    }

    protected getReference(id: string) {
        return doc(this.firestore, this.itemType, id);
    }

    public getItemObservable(id: string) {
        return docData(this.getReference(id), { idField: 'id' }) as Observable<T>;
    }
    public getItemsObservable() {
        return collectionData(this.getQuery(), { idField: 'id' }) as Observable<T[]>;
    }

    public async getItem(id: string) {
        return await firstValueFrom(this.getItemObservable(id));
    }

    public async getItems() {
        return (await firstValueFrom(this.getItemsObservable())) as T[];
    }

    public async setItem(item: Partial<T>) {
        if (item.id) {
            return await this.updateItem(item);
        } else {
            return await this.addItem(item);
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
