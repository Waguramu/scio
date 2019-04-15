import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Document} from "@/_models";

@Injectable({providedIn: 'root'})
export class AnnotationExtractionService {

    constructor(private http: HttpClient) {
    }

    extractTextFromPDF(file: File) {
        var formData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(`${config.apiUrl}/annotation/to_text`,
            formData,
            {
                headers: {'Content-Type': undefined}
            }
        );
    }

    extractAnnotations(text: string) {
        return this.http.post<string[]>(`${config.apiUrl}/annotation/extract`, {text: text});
    }

    runSearchQuery(query: string) {
        return this.http.post<Document[]>(`${config.apiUrl}/annotation/extract`, {query: query});
    }
}