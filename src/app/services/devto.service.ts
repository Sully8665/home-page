import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DevToArticle
{
    id: number;
    title: string;
    description: string;
    cover_image: string;
    readable_publish_date: string;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class DevtoService
{
    private readonly username = 'sully8665';
    private readonly apiUrl = `https://dev.to/api/articles?username=${ this.username }`;

    constructor(private http: HttpClient) { }

    getArticles(): Observable<DevToArticle[]>
    {
        return this.http.get<DevToArticle[]>(this.apiUrl);
    }
}
