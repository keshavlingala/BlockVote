import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages = {};
  private currentLanguage: any = {};
  private code = 'en'

  constructor(private http: HttpClient) {
    http.get('assets/languages.json').subscribe((res) => {
      this.languages = res;
      this.currentLanguage = res[this.code];
    })
  }

  get language() {
    return this.currentLanguage;
  }
  get languageCode() {
    return this.code;
  }

  changeLanguage(language: string) {
    this.code = language;
    this.currentLanguage = this.languages[language];
  }

  getLanguage() {
    return this.currentLanguage;
  }
}
