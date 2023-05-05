import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages = {
    en: {},
    es: {},
    fr: {},
    hn: {},
    cn: {},
  }
  private currentLanguage: any = {};
  private code = 'en'

  constructor(private http: HttpClient) {
    http.get('assets/en.json').subscribe((res) => {
      this.languages.en = res;
      this.currentLanguage = res;
    })
    http.get('assets/es.json').subscribe((res) => {
      this.languages.es = res;
    })
    http.get('assets/fr.json').subscribe((res) => {
      this.languages.fr = res;
    })
    http.get('assets/hn.json').subscribe((res) => {
      this.languages.hn = res;
    })
    http.get('assets/cn.json').subscribe((res) => {
      this.languages.cn = res;
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
