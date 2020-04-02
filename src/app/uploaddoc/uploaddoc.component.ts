import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-uploaddoc',
  templateUrl: './uploaddoc.component.html',
  styleUrls: ['./uploaddoc.component.css']
})
export class UploaddocComponent implements OnInit {

  form: FormGroup;
  file = '';
  mimeTypeError =  false;
  message = '';

  constructor() { }

  ngOnInit(): void {
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
