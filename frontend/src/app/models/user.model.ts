import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public street: string,
        public postal: string,
        public city: string,
        public housenumber: number
    ){}
}