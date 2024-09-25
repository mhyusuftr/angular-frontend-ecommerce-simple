import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import axios from 'axios'

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  formGroup!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern(/^([^0-9]*)$/)]], 
      customerAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]], 
      customerPhone: ['', [Validators.pattern(/^0\d{9,12}$/)]],
      file: [null]
    })
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.files && inputElement.files.length > 0) {
      this.formGroup.controls['file'].setValue(inputElement.files[0])
    }
  }

  async onSubmitForm(): Promise<void> {
    if (this.formGroup.invalid) {
      console.log('Formulir tidak valid')
      return
    }

    try {

      let customer = {
        customerName: this.formGroup.value.customerName,
        customerAddress: this.formGroup.value.customerAddress,
        customerPhone: this.formGroup.value.customerPhone,
      }

      const formData = new FormData()
      formData.append('customer', new Blob([JSON.stringify(customer)], {type: 'application/json'}));
      formData.append('pic', this.formGroup.value.file);

      const response = await axios.post(
        'http://localhost:8080/api/customer',
        formData,
        {
          headers: {
            'Content-Type': undefined
          }
        }
      )

      this.router.navigate([''])
    } catch (error) {

      console.error(error)

      if (error instanceof axios.AxiosError) {
        alert('Error while creating customer')
      }

    }
  }
}
