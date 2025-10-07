import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DevToArticle, DevtoService } from '../../services/devto.service';
import { LanguageService } from '../../services/language.service';
import { ARTICLES_INFO, DevToProfile, MORE, MOREFA } from '../../shared/models/data';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css'],
    animations: [
        trigger('listAnimation', [
            transition(':enter', [
                query('.article-card', [
                    style({ opacity: 0, transform: 'translateY(20px)' }),
                    stagger(100, [
                        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ])
            ])
        ])
    ]
})
export class ArticlesComponent implements OnInit
{
    articles: DevToArticle[] = [];
    loading = true;
    MORE = MORE;
    MOREFA = MOREFA;
    ARTICLES_INFO = ARTICLES_INFO;

    constructor(private devto: DevtoService,
        public lang: LanguageService
    ) { }

    ngOnInit(): void
    {
        this.devto.getArticles().subscribe({
            next: (data) =>
            {
                this.articles = data.slice(0, 3);
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }

    get profile(): string
    {
        return DevToProfile;
    }
}
