import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class LocalStorageService {
    constructor() { }

    // Save data to local storage
    saveData(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Retrieve data from local storage
    getData(key: string): any {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // Remove data from local storage
    removeData(key: string): void {
        localStorage.removeItem(key);
    }
}