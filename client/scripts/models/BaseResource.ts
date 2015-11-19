import {Http, Headers} from 'angular2/http';
import {Config} from '../Config';
import {Inject} from 'angular2/angular2';

interface IFilter {
    include: any;
}

export abstract class BaseResource {
    config: Config;
    http:   Http;
    modelName: string;
    model: any;

    constructor(@Inject(Http) http: Http) {
        this.http   = http;
        this.config = new Config();
    }

    search (searchFor : string) {
        return new Promise((resolve, reject) => {
            this.http.get(this.config.apiUrl + '/api/' + this.modelName + '/search/' + searchFor)
                .map(res => res.json())
                .subscribe(res => {
                    if (res.error) {
                        reject(res.error);
                    } else {
                        resolve(this.mapListToModelList(res));
                    }
                });
        });
    }

    mapListToModelList (list: Array<Object>) {
        list.forEach((item, index) => {
            list[index] = this.mapModel(item);
        });

        return list;
    }

    mapModel(model: any) {
        return this.model(model);
    }

    findById(id: number, filter: IFilter = null) {
        return new Promise((resolve, reject) => {
            let url = this.config.apiUrl + '/api/' + this.modelName + '/get/' + id;
            // if (filter) {
            //     url = url + "?filter=" + JSON.stringify(filter);

            //     console.log("URL", url);
            // }

            this.http.get(url)
                .map(res => res.json())
                .subscribe(res => {
                    if (res.error) {
                        reject(res.error);
                    } else {
                        resolve(this.mapModel(res));
                    }
                });
        });
    }

    find(filter: IFilter = null) {
        return new Promise((resolve, reject) => {
            let url = this.config.apiUrl + '/api/' + this.modelName;
            // if (filter) {
            //     url = url + "?filter=" + JSON.stringify(filter);

            //     console.log("URL", url);
            // }

            this.http.get(url)
                .map(res => res.json())
                .subscribe(res => {
                    if (res.error) {
                        reject(res.error);
                    } else {
                        resolve(this.mapListToModelList(res));
                    }
                });
        });
    }

    update(model) {
        return new Promise((resolve, reject) => {
            let url = this.config.apiUrl + '/api/' + this.modelName;
            // if (filter) {
            //     url = url + "?filter=" + JSON.stringify(filter);

            //     console.log("URL", url);
            // }
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');

            this.http.put(url, JSON.stringify(model), {headers : headers})
                .map(res => res.json())
                .subscribe(res => {
                    console.log(res);
                    if (res.error) {
                        reject(res.error);
                    } else {
                        resolve(this.mapModel(res));
                    }
                });
        });
    }
}
