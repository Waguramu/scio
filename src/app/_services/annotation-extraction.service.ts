import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Document} from "@/_models";

@Injectable({providedIn: 'root'})
export class AnnotationExtractionService {

    constructor(private http: HttpClient) {
    }

    extractTextFromPDF(file: File) {
        console.log("Uploading file: " + file.name);
        var formData = new FormData();
        formData.append('file', file);
        return this.http.post<object>(`${config.apiUrl}/annotation/to_text`,
            formData,
            {}
        );
    }

    extractAnnotations(text: string) {
        return this.http.post<string[]>(`${config.apiUrl}/annotation/extract`, {text: text});
    }

    runSearchQuery(query: string) {
        return this.http.post<Document[]>(`${config.apiUrl}/annotation/search`, {query: query});
    }
}