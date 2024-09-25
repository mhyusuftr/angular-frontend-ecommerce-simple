import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import axios from 'axios'

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  itemId: number = 0
  formGroup!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  goToMainItem(): void {
    this.router.navigate(['/item'])
  }

  ngOnInit() {
    this.itemId = Number(this.route.snapshot.paramMap.get('itemId'))

    this.formGroup = this.formBuilder.group({
      itemName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern(/^([^0-9]*)$/)]], 
      itemCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      stock: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(14), Validators.pattern(/^[1-9][0-9]*$/)]],
      price: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(14), Validators.pattern(/^[1-9][0-9]*$/)]],
      lastReStock: [null],
      isAvailable: [Validators.required],
    })

    this.loadItemData()
  }

  async loadItemData(): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/item/${this.itemId}`
      )
      const itemData = response.data

      const lastReStock = itemData.lastReStock
        ? new Date(itemData.lastReStock).toISOString().slice(0, 10)
        : null

      this.formGroup.patchValue({
        itemName: itemData.itemName,
        itemCode: itemData.itemCode,
        stock: itemData.stock,
        price: itemData.price,
        lastReStock: lastReStock,
        isAvailable: itemData.isAvailable,
      })
    } catch (error) {
      console.error('Error fetching item data:', error)
    }
  }

  async onSubmitForm(): Promise<void> {
    if (this.formGroup.invalid) {
      console.log('Formulir tidak valid')
      return
    }

    try {
      const formData = new FormData()
      formData.append('itemName', this.formGroup.get('itemName')?.value)
      formData.append('itemCode', this.formGroup.get('itemCode')?.value)
      formData.append('stock', this.formGroup.get('stock')?.value)
      formData.append('price', this.formGroup.get('price')?.value)
      formData.append('isAvailable', this.formGroup.get('isAvailable')?.value)

      let lastRestock = this.formGroup.get('lastReStock')?.value

      
      
      if (lastRestock) {
        const currentDate = new Date(lastRestock)
        const now = new Date()
        
        currentDate.setHours(now.getHours())
        currentDate.setMinutes(now.getMinutes())
        currentDate.setSeconds(now.getSeconds())
        currentDate.setMilliseconds(now.getMilliseconds())
                
        lastRestock = currentDate.toISOString()
        console.log(lastRestock);
      }

      formData.append('lastRestock', lastRestock)

      console.log('Item data yang akan disimpan:', formData)

      const response = await axios.put(
        `http://localhost:8080/api/item/${this.itemId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('Item yang berhasil diupdate:', response.data)

      alert('Item berhasil diupdate')
      this.router.navigate(['/item'])
    } catch (error) {
      console.error('Error updating item:', error)
      alert('Item gagal diupdate')
    }
  }
}
