import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import axios from 'axios'

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html'
})
export class EditOrderComponent implements OnInit {
  orderId: number = 0
  customer: any[] = []
  items: any[] = []
  formGroup!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  goToMainOrder(): void {
    this.router.navigate(['/order'])
  }

  ngOnInit() {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'))


    this.formGroup = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      itemId: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]]
    })

    this.loadOrderData()
    this.getItems()
    this.getCustomer()
  }

  async loadOrderData(): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/order/${this.orderId}`
      )
      const orderData = response.data

      this.formGroup.patchValue({
        customerId: orderData?.customer?.customerId,
        itemId: orderData?.item?.itemId,
        quantity: orderData?.quantity
      })
    } catch (error) {
      console.error('Error fetching order data:', error)
    }
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
      console.log('Formulir tidak valid')
      return
    }

    try {
      const formData = new FormData()
      formData.append('customerId', this.formGroup.value.customerId)
      formData.append('itemId', this.formGroup.value.itemId)
      formData.append('quantity', this.formGroup.get('quantity')?.value)

      const response = await axios.put(
        `http://localhost:8080/api/order/${this.orderId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('Order yang berhasil diupdate:', response.data)

      alert('Order berhasil diupdate')
      this.router.navigate(['/order'])
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Order gagal diupdate')
    }
  }
}
