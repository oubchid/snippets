import { Injectable } from '@angular/core';

@Injectable()
export class HmacService {

  constructor() { }

  public generate(body: Object): string {
    let hash_str: string;
    hash_str = this.iterate(this.sort(body));
    console.log(hash_str);
    return hash_str;
  }

  private iterate(object) {
    const values = [];
    for (const property in object) {
        if (object.hasOwnProperty(property)) {
            if (typeof object[property] === 'object') {
                values.push(this.iterate(object[property]));
            } else {
                values.push(object[property]);
            }
        }
    }
    return values.join('*');
  }

  private sort(object: Object): Object {
    const _ordered = {};
    const _this = this;
    Object.keys(object)
      .sort()
      .forEach(function(key, i) {
        if (typeof object[key] === 'object'){
          _ordered[key] = _this.sort(object[key]);
        }else {
          _ordered[key] = object[key] ;
        }
      });
    return _ordered;
  }

  public sign(body: Object): Object {
    body['sHMAC'] = this.generate(body);
    return body;
  }

}
