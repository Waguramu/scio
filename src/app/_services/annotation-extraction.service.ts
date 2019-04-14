import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AnnotationExtractionService {

    constructor(private http: HttpClient) {
    }

    extractAnnotations(text: string) {
        return this.http.post<string[]>(`${config.apiUrl}/annotation/extract`, { text });
    }
}