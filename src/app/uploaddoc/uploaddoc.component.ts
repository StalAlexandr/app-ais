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
  extidappli = '200800011';
  odcorresp : any =1;
  user='Козьма Прутков'



  ngOnInit(): void {
  console.log('init');
  }
  uploadFile(event: any) {
    //  console.log('File', event);
    const f: File = event[0]
    console.log('File', f);



    const myReader: FileReader = new FileReader();
    myReader.onload = (e) => {

console.log(e);

      const dataurl = e.target.result as string;
      const header  = dataurl.substr(0, dataurl.indexOf(';'))
      if (header === 'data:application/pdf') {
        this.mimeTypeError = false;

        console.log('this.mimeTypeError ' + this.mimeTypeError);
           console.log('this.file ' + this.file);
        this.file = dataurl.substr(dataurl.indexOf(',') + 1);
      } else {
        this.mimeTypeError = true;
      }
      console.log('header', header);
    }
 //   myReader.readAsDataURL(f);

 const formData: FormData = new FormData();




    formData.append('file', f, 'file.pdf');
    formData.append('idappli', this.extidappli);
    formData.append('odcorresp', this.odcorresp);
    formData.append('signer', this.user);





 const headers = new HttpHeaders().append("Access-Control-Allow-Origin", "*")
      .append("Access-Control-Allow-Origin", "*")
      .append("Access-Control-Allow-Methods", "POST")
      .append("Access-Control-Allow-Headers", "Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")



   const body = {};
 const  o:Observable<any> = this.http.post('http://localhost:8888/document', formData,{headers,   responseType: "blob"} );


o.subscribe(
                    blob =>  {
                    console.log('DATA!'); console.log(blob);

                    blob.lastModifiedDate = new Date();
                    blob.name = 'signed.pdf';



                    myReader.readAsDataURL(<File>blob);

                    },
                    error => {console.log('ERROR!'); console.log(error)}
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
