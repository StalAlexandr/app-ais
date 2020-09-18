import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-uploaddoc',
  templateUrl: './uploaddoc.component.html',
  styleUrls: ['./uploaddoc.component.css']
})
export class UploaddocComponent implements OnInit {

 private baseUrl = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  form: FormGroup;
  file = '';
  mimeTypeError =  false;
  message = '';



  ngOnInit(): void {
  console.log('init');
    this.form = this.form = new FormGroup({
      appli: new FormControl('', [
        Validators.minLength(9),
        Validators.required
      ]),
      doctype: new FormControl('pat')
    });
  }
  uploadFile(event: any) {
    //  console.log('File', event);
    const f: File = event[0]
    console.log('File', f);



    const myReader: FileReader = new FileReader();
    myReader.onload = (e) => {

      const dataurl = e.target.result as string;
      const header  = dataurl.substr(0, dataurl.indexOf(';'))
      if (header === 'data:application/pdf') {
        this.mimeTypeError = false;
        this.file = dataurl.substr(dataurl.indexOf(',') + 1);
      } else {
        this.mimeTypeError = true;
      }
      console.log('header', header);
    }
    myReader.readAsDataURL(f);

 const formData: FormData = new FormData();




    formData.append('file', f, 'ddddd');
/*
    const req = new HttpRequest('POST', `http://localhost:8888/uploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });


 const  o:Observable<any>  = this.http.request(req);
*/

/*
 o.subscribe(
                     data => console.log(data),
                     error => console.log(error)
               );

*/
//     const req2 = new HttpRequest('GET', `${this.baseUrl}/upload`);
//    console.log('get!!!');

// const  o:Observable<any> = this.http.get('http://localhost:8888/upload', {responseType: 'text'});

  //  console.log('o ' + o);


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'POST',
    'Access-Control-Allow-Headers':'Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

  })
};

   const body = {};
 const  o:Observable<any> = this.http.post('http://localhost:8888/uploadFile', formData, httpOptions);
// const  o:Observable<any> = this.http.get('http://localhost:8888/upload', {responseType: 'text'});

o.subscribe(
                    data => console.log(data),
                    error => console.log(error)
              );


   return  ""

  }

  submit() {

    if (this.form.valid) {
    this.form.reset();
    this.file = '';
    this.message = 'Отправка...'
    setTimeout(() => {
      this.message = '';
    }, 2500);

      //  console.log('Form: ', this.form)
    //  const formData = {...this.form.value}

    //  console.log('Form Data:', formData);
    }
  }
}
