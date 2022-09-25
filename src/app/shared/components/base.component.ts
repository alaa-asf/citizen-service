import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';


export abstract class BaseComponent {
    HttpClient!: HttpClient;
    url: string = 'https://localhost:7183';

    constructor(injector: Injector) {
        this.HttpClient = injector.get(HttpClient);
    }
}