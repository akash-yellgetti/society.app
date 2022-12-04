import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  set(key: any, value: any): any {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: any): any {
    return JSON.parse(localStorage.getItem(key) || null);
  }

  delete(key: any): any {
    return localStorage.removeItem(key);
  }

  setSessionStorage(key: any, value: any): any {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionStorage(key: any): any {
    return JSON.parse(sessionStorage.getItem(key) || '{}');
  }

  deleteSessionStorage(key: any): any {
    return sessionStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  getTimeAgo(value: any) {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      const intervals = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter: any;
      for (const i in intervals) {
        if (intervals.hasOwnProperty(i)) {
          counter = Math.floor(seconds / intervals[i]);
          if (counter > 0) {
            switch (i) {
              case 'second':
                return 'Just now';
              case 'minute':
                if (counter < 2) {
                  return `${counter} minute ago`;
                }
                return `${counter} minutes ago`;
              case 'hour':
                if (counter < 2) {
                  return `${counter} hour ago`;
                }
                return `${counter} hours ago`;
              case 'day':
                if (counter < 2) {
                  return `${counter} day ago`;
                }
                return `${counter} days ago`;
            }
            // if (i === 'second' || i === 'minute' || i === 'hour') {
            //   return 'Today';
            // } else if (i === 'day' && counter < 2) {
            //   return 'Yesterday';
            // } else if (i === 'day' && counter >= 2) {
            //   return counter + ' days ago';
            // }
          }
        }
      }
    }
    return '';
  }
}
