import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import axios from 'axios'

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  customer: any[] = []
  items: any[] = []
  formGroup!: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  goToMainOrder(): void {
    this.router.navigate(['/order'])
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      itemId: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]]
    })

    this.getItems()
    this.getCustomer()
  }

  async getItems(): Promise<void> {
    try {
      const response = await axios.get(`http://localhost:8080/api/item?size=`)
      this.items = response.data.content.filter((itm: { isAvailable: boolean }) => itm.isAvailable === true)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  async getCustomer(): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/customer?size=`
      )
      this.customer = response.data.content.filter((cst: { isActive: boolean }) => cst.isActive === true)
    } catch (error) {
      console.error('Error fetching customer:', error)
    }
  }

  async onSubmitForm(): Promise<void> {
    if (this.formGroup.invalid) {
      console.error('Invalid form')
      return
    }

    try {
      const formData = new FormData()
      formData.append('customerId', this.formGroup.value.customerId)
      formData.append('itemId', this.formGroup.value.itemId)
      formData.append('quantity', this.formGroup.value.quantity)

      const response = await axios.post(
        'http://localhost:8080/api/order',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      this.router.navigate(['/order'])
    } catch (error) {
      console.error('Error while creating order:', error)
    }
  }
}
