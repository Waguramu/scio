import {Component} from '@angular/core';
import {FakeData} from "@/_helpers";
import {Document} from "@/_models";
import {query} from "@angular/animations";
import {forEach} from "@angular/router/src/utils/collection";
import {AnnotationExtractionService} from "@/_services";
import {error} from "util";

@Component({
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent {
    pic_search = "/src/assets/img/loupe-w.png";

    fakeData: FakeData;
    annotationExtractionService: AnnotationExtractionService;

    cases: any = [
        {
            similarity_degree: '99%',
            title: ' Alkoholexport nach China',
            record_date: '23.05.2018',
            id: 'X20180523CND',
            reference: '',
            start: '01.02.2018',
            end: '20.05.2018',
            lawyer: '@Lawyer Lee; @Lawyer Ben Müller',
            client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '92%',
            title: ' Warenexport nach China',
            record_date: '23.05.2018',
            id: 'X20180523CND',
            reference: '',
            start: '01.02.2018',
            end: '20.05.2018',
            lawyer: '@Lawyer Lee; @Lawyer Ben Müller',
            client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '85%',
            title: ' Alcoholexport nach Asien',
            record_date: '23.05.2018',
            id: 'X20180523CND',
            reference: '',
            start: '01.02.2018',
            end: '20.05.2018',
            lawyer: '@Lawyer Lee; @Lawyer Ben Müller',
            client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '80%',
            title: ' Getränke Exportieren nach China',
            record_date: '23.05.2018',
            id: 'X20180523CND',
            reference: '',
            start: '01.02.2018',
            end: '20.05.2018',
            lawyer: '@Lawyer Lee; @Lawyer Ben Müller',
            client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '73%',
            title: ' Export Beschränkung',
            record_date: '23.05.2018',
            id: 'X20180523CND',
            reference: '',
            start: '01.02.2018',
            end: '20.05.2018',
            lawyer: '@Lawyer Lee; @Lawyer Ben Müller',
            client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '62%',
            title: ' Alkoholexport nach China',
            record_date: '23.05.2018',
            id: 'X20180523CND',
            reference: '',
            start: '01.02.2018',
            end: '20.05.2018',
            lawyer: '@Lawyer Lee; @Lawyer Ben Müller',
            client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        }
    ];

    searching: Boolean;
    warning: Boolean;
    warningMessage: string;
    query: string;
    annotations: string[];
    meta: any[];
    documents: Document[];

    constructor() {
        this.fakeData = new FakeData();
        this.searching = false;
        this.query = "";
        this.warning = false;
        this.documents = [];
        this.meta = [];
        this.annotations = [];
    };

    search() {
        this.documents = [];
        this.annotations = [];
        this.meta = [];
        if (this.query == "") {
            this.warn("Please enter text in the input field.");
            this.searching = false;
        } else {
            this.warning = false;
            this.searching = !this.searching;
        }
        this.extractAnnotations(this.query);
    };

    extractTextFromPDF(file: File) {
        this.annotationExtractionService.extractTextFromPDF(file).subscribe(
            text => {
                console.log("Received extracted text: " + text);
                this.query = text;
                this.search();
            },
            error => {
                console.log("Failed to extract text, using default. Reason: " + error);
                this.query = "china export";
                this.search();
            }
        )
    }

    extractAnnotations(text: string) {
        // Call api or processing
        this.annotationExtractionService.extractAnnotations(text).subscribe(
            annotations => {
                console.log("Received annotations: " + annotations);
                this.applyAnnotations(annotations.join(" "));
            },
            error => {
                this.warn("Failed to generate text annotation: " + error);
                this.search(["china", "export"].join(" "));
            },
        );
    };



    private applyAnnotations(annotations) {
        this.annotations = annotations;
        this.meta = [];
        for (let document of this.fakeData.documents) {
            let intersection = document.annotations.filter(x => annotations.includes(x));
            if (intersection.length != 0) {
                this.meta.push({
                    id: document.id,
                    annotations: intersection,
                    percentage: 100 * intersection.length / annotations.length
                });
            }
        }
        // Sort the documents' ids in descending order so the best coincidence is at the top
        this.meta.sort((a, b) => {
            if (a.annotations.length > b.annotations.length) {
                return -1;
            } else return 1;
        });

        //console.log([...documentIds.entries()].map(([key, value]) => ({key, ...value})).sort((a, b) => a.length - b.length));
        // this.meta = documentIds;

        for (let id of this.meta.map(function (a) {
            return a.id;
        })) {
            this.documents.push(this.fakeData.documents[id - 1]);
        }
    }

    private search(annotation: String) {
        this.annotationExtractionService.runSearchQuery(annotation).subscribe(
            result => {
                result.forEach(document => this.documents.push(document));
            },
            error => {
                this.warn("Failed to run search, using fallback. Reason: " + error);
                this.applyAnnotations(annotation);
            }
        );
    }

    getPercentage(id) {
        return this.meta.filter(a => a.id == id).map(a => a.percentage);
    }

    warn(message: string) {
        this.warningMessage = message;
        this.warning = true;
    }
}