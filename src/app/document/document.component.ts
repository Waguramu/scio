import {Component, NgModule, OnInit} from '@angular/core';
import { FakeData } from  '../_helpers';
import {Document} from "@/_models";
import {AppComponent} from "@/app.component";
import {BrowserModule} from "@angular/platform-browser";
import construct = Reflect.construct;

@Component({
    templateUrl: 'document.component.html',
    styleUrls: ['../app.component.css', './document.component.css']
})
export class DocumentComponent implements OnInit{
    pic_search = "/src/assets/img/loupe-w.png";
    constructor() {

    }

    ngOnInit() {
    }

    fakeData: FakeData;



    /* tabs */
    static openTab(tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        // console.log(tabName);
        // document.getElementsByClassName(tabName).;
        /* evt.currentTarget.className += " active";*/

    };





/*
    cases: any = [
        {
            similarity_degree: '99%', title: ' Alkoholexport nach China', record_date: '23.05.2018',
            id: 'X20180523CND', reference: '', start: '01.02.2018', end: '20.05.2018', lawyer: '@Lawyer Lee; @Lawyer Ben Müller', client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '92%', title: ' Warenexport nach China', record_date: '23.05.2018',
            id: 'X20180523CND', reference: '', start: '01.02.2018', end: '20.05.2018', lawyer: '@Lawyer Lee; @Lawyer Ben Müller', client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '85%', title: ' Alcoholexport nach Asien', record_date: '23.05.2018',
            id: 'X20180523CND', reference: '', start: '01.02.2018', end: '20.05.2018', lawyer: '@Lawyer Lee; @Lawyer Ben Müller', client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '80%', title: ' Getränke Exportieren nach China', record_date: '23.05.2018',
            id: 'X20180523CND', reference: '', start: '01.02.2018', end: '20.05.2018', lawyer: '@Lawyer Lee; @Lawyer Ben Müller', client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '73%', title: ' Export Beschränkung', record_date: '23.05.2018',
            id: 'X20180523CND', reference: '', start: '01.02.2018', end: '20.05.2018', lawyer: '@Lawyer Lee; @Lawyer Ben Müller', client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        },
        {
            similarity_degree: '62%', title: ' Alkoholexport nach China', record_date: '23.05.2018',
            id: 'X20180523CND', reference: '', start: '01.02.2018', end: '20.05.2018', lawyer: '@Lawyer Lee; @Lawyer Ben Müller', client: '@John Doe',
            keywords: 'Exportieren, China, Alcohol, Beschänkungen, Getränke',
            content: 'China’s alcoholic drinks market has grown significantly in recent decades, reaching 687 million hectolitres (hl) in 2014 with a CAGR of 5.3% from 2009 to 2014.\n' +
                'However, the procedure of bringing your products from abroad to the hand of Chinese customers is not that easy. You will need to understand how the procedure works, what documents you need to prepare, how much it costs and how long it usually takes. For example, when you prepare the label for your product, it is important to check what content are required by the Chinese authorities to sell in China. ...'
        }
    ];

    searching: Boolean;
    warning: Boolean;
    query: string;
    annotations: string[];
    meta: any[];
    my_documents: Document[];
    saved_documents: Document[];

    constructor(){
        this.fakeData = new FakeData();
        // this.searching = false;
        // this.query = "";
        this.warning = false;
        this.my_documents = [];
        this.saved_documents = [];
        this.meta = [];
        this.annotations = [];
    };



    extractAnnotations() {
        // Call api or processing
        let annotations = ['blah', 'mlah', 'flah', 'nlah', 'dlah'];
        this.annotations = annotations;
        this.meta = [];
        for (let document of this.fakeData.documents) {
            let intersection = document.annotations.filter(x => annotations.includes(x));
            if (intersection.length != 0) {
                this.meta.push({id: document.id,
                    annotations: intersection,
                    percentage: 100 * intersection.length / annotations.length});
            }
        }
        // Sort the documents' ids in descending order so the best coincidence is at the top
        this.meta.sort((a, b) => {
            if (a.annotations.length > b.annotations.length) { return -1; } else return 1;
        });

        //console.log([...documentIds.entries()].map(([key, value]) => ({key, ...value})).sort((a, b) => a.length - b.length));
        // this.meta = documentIds;

        for (let id of this.meta.map(function(a) { return a.id; })) {
           //  this.documents.push(this.fakeData.documents[id - 1]);
        }
    };

*/

}