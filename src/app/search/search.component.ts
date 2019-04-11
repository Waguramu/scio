import { Component } from '@angular/core';

@Component({
    templateUrl: 'search.component.html',
})

export class SearchComponent {
    // private LOGO = require()

    title = "Deep Tool";
    pic_logo = "";
    pic_search = "/src/assets/img/loupe-w.png";

    elements: any = [
        {date: "08.04.2019", name: 'Mark Otto', email: 'mark.otto@gmail.com', text: "My neighbour shits in my garden every weekend!"},
        {date: "08.04.2019", name: 'Axel Müller', email: 'axel@gmx.de', text: "I bumped my car!"},
        {date: "08.04.2019", name: 'Marina Steinmeier', email: 'mst@yahoo.jp', text: "I lost all my money to a Nigerian prince"}
    ];


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
    ]

    constructor(){};
}