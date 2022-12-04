import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { camelCase, startCase } from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  getRandomInt = (): number => {
    return (Math.floor(Math.random() * Math.floor(new Date().getTime())));
  }

  uuid = (): string => {
    const randomInt = this.getRandomInt();
    return 'xxxxxxxx-yyyy-xxxx-yyyy-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * randomInt) * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  findOrDiscard = (data: any = [], result: any = [], clause: any = [], discard: any = []): Array<any> => {
    if (data && typeof data === 'object') {
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          this.findOrDiscard(data[i], result, clause, discard);
        }
      } else {
        const keys = Object.keys(data).filter(x => !discard.includes(x));
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const keyCondition = clause && typeof clause === 'object' && Array.isArray(clause) === false ? (clause.hasOwnProperty(key)) : (clause.indexOf(key) > -1);
          const valueCondition = keyCondition && typeof clause === 'object' && Array.isArray(clause) === false ? (clause[key] === data[key]) : true;
          if (keyCondition && valueCondition && result.indexOf(data) === -1) {
            result.push(data);
          } else {
            this.findOrDiscard(data[key], result, clause, discard);
          }
        }
      }
    }

    return result;
  }

  customFlatten = function (object: any) {
    function recursive(object) {
      return Object.keys(object).reduce(function (result, key) {
        return result.concat(
          object[key] && typeof object[key] === 'object' ?
            recursive(object[key]) :
            object
        );
      }, []);
    }

    const data = recursive(object || {});
    return data.filter((value, index) => data.indexOf(value) === index);
  };

  customNestedFlatten = function (object: any[], key: string) {
    return _.chain(object)
      .thru(function (data) {
        const recursive = (data, key, result) => {
          const res = _.chain(data).map(key).flatten().reject(_.isEmpty).value();
          return res && res.length > 0 ? recursive(res, key, _.union(result, res)) : _.union(result, data);
        };
        return _.union(data, recursive(data, key, []));
      }).value();
  };

  getAncestor = (structure, structureKey, key, value) => {
    const data = this.customNestedFlatten(structure, structureKey);
    const getParent = (data, value, result) => {
      const where = {};
      where[key] = value;
      const res = _.chain(data).map(d => {
        const parent = _.find(d[structureKey], where);
        if (parent) {
          return d;
        }
      }).reject(_.isEmpty).value();

      return res && res.length > 0 ? getParent(data, _.get(_.first(res), key), _.union(res, result)) : result;
    };
    return getParent(data, value, []);
  }

  getEnumJson = (data: any) => {
    return _.chain(data).map((value: any, key: any) => {
      return {
        key: value,
        value: key,
        label: startCase(camelCase(key)).replace(/ /g, ' ')
      };
    }).value();
  }

  objectDifference = (object: any, baseObject: any) => {
    function changes(object: any, baseObject: any) {
      return _.transform(object, function (result, value, key) {
        if (!_.isEqual(value, baseObject[key])) {
          result[key] = (_.isObject(value) && _.isObject(baseObject[key])) ? changes(value, baseObject[key]) : value;
        }
      });
    }
    return changes(object, baseObject);
  }

  searchByText = (collection: any[], text: string, exclude: any[]) => {
    return _.filter(collection, _.flow(
      _.partial(_.omit, _, exclude),
      _.partial(
        _.some, _,
        _.flow(_.toLower, _.partial(_.includes, _, _.toLower(text), 0))
      )
    ));
  }

  hashCode = (str: string) => {
    return str.split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
  }

  getTimeAgo = (value: any) => {
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
              default:
                if (counter < 2) {
                  return `${counter} ${i} ago`;
                }
                return `${counter} ${i}s ago`;
            }
          }
        }
      }
    }
    return '';
  }
}
