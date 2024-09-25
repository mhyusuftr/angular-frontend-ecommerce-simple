import { Component, OnInit } from '@angular/core'
import axios from 'axios'
import { Router } from '@angular/router'
import {
  faEye,
  faEdit,
  faTrash,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html'
})
export class MainItemComponent implements OnInit {
  items: any[] = []
  totalPages: number = 0
  currentPage: number = 0
  pageSize: number = 5
  totalData: number = 0
  searchItemName: string = ''
  sortDirection: string = 'asc'
  isModalOpen: boolean = false
  itemNameToDelete: string = ''
  itemIdToDelete: number = 0
  isItmUsed: boolean = false;

  constructor(private router: Router) {}

  faEye = faEye
  faEdit = faEdit
  faTrash = faTrash
  faCheck = faCheck
  faTimes = faTimes

  goDetailItem(itemId: number): void {
    this.router.navigate(['/detail-item', itemId])
  }

  goAddItem(): void {
    this.router.navigate(['/add-item'])
  }

  goEditItem(itemId: number): void {
    this.router.navigate(['/edit-item', itemId])
  }

  ngOnInit(): void {
    this.getItems()
  }

  async getItems(page: number = 0): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/item?page=${page}&size=${this.pageSize}&itemName=${this.searchItemName}&direction=${this.sortDirection}`
      )
      this.items = response.data.content
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1
      this.totalData = response.data.totalElements
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  openDeleteConfirmationModal(itemId: number, itemName: string): void {

    this.checkUsedId("Item", itemId);

    this.itemIdToDelete = itemId
    this.itemNameToDelete = itemName
    this.isModalOpen = true
  }

  closeDeleteConfirmationModal(): void {
    this.isModalOpen = false
    this.isItmUsed = false
  }

  async checkUsedId(module: string, id: number): Promise<void>{

    try {
      const response = await axios.get(
        `http://localhost:8080/api/order/checkUsedId?module=${module}&id=${id}`
      )
      this.isItmUsed = response.data
    } catch (error) {
      console.error("error checking used id : " + error)
    }

  }

  async confirmDeleteItem(): Promise<void> {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/item/${this.itemIdToDelete}`
      )

      this.getItems(0)
    } catch (error) {
      console.error('Error while deleting item:', error)
      alert('Error while deleting item')
    } finally {
      this.closeDeleteConfirmationModal()
    }
  }

  onPageChange(page: number): void {
    this.getItems(page - 1) // Karena pagination dimulai dari 1, sedangkan index page dimulai dari 0
  }

  searchItems(): void {
    this.getItems()
  }

  sortItems(): void {
    this.getItems()
  }

  pageSizeItems(): void {
    this.getItems()
  }

  formatMoney(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }
}
