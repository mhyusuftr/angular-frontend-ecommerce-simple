import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import axios from 'axios'

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerId: number = 0
  formGroup!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.customerId = Number(this.route.snapshot.paramMap.get('customerId'))

    this.formGroup = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern(/^([^0-9]*)$/)]], 
      customerAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]], 
      customerPhone: ['', [Validators.pattern(/^0\d{9,12}$/)]],
      isActive: [Validators.required],
      file: [null],
    })

    this.loadCustomerData()
  }

  async loadCustomerData(): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/customer/${this.customerId}`
      )
      const customerData = response.data

      this.formGroup.patchValue({
        customerName: customerData.customerName,
        customerAddress: customerData.customerAddress,
        customerPhone: customerData.customerPhone,
        isActive: customerData.isActive
      })
    } catch (error) {
      console.error('Error fetching customer data:', error)
    }
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.files && inputElement.files.length > 0) {
      this.formGroup.controls['file'].setValue(inputElement.files[0])
    }
  }

  async onSubmitForm(): Promise<void> {
    if (this.formGroup.invalid) {
      console.error('Invalid Form')
      return
    }

    try {

      let customer = {
        customerName: this.formGroup.value.customerName,
        customerAddress: this.formGroup.value.customerAddress,
        customerPhone: this.formGroup.value.customerPhone,
        isActive: this.formGroup.value.isActive,
      }

      const formData = new FormData()
      
      formData.append('customer', new Blob([JSON.stringify(customer)], {type: 'application/json'}));
      formData.append('pic', this.formGroup.value.file);


      const response = await axios.put(
        `http://localhost:8080/api/customer/${this.customerId}`,
        formData,
        {
          headers: {
            'Content-Type': undefined
          }
        }
      )
      console.log('Customer updated:', response.data)
      this.router.navigate([''])
    } catch (error) {
      alert("Error while updating customer")
    }
  }
}
