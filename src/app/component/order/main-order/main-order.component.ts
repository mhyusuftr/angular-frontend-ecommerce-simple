import { Component, OnInit } from '@angular/core'
import axios from 'axios'
import { Router } from '@angular/router'
import { faEye,faEdit,faTrash,faCheck,faTimes, faFileAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-main-order',
  templateUrl: './main-order.component.html'
})
export class MainOrderComponent implements OnInit {
  order: any[] = []
  totalPages: number = 0
  currentPage: number = 0
  pageSize: number = 5
  totalData: number = 0
  searchOrderCustomerName: string = ''
  sortDirection: string = 'asc'
  isModalOpen: boolean = false
  orderNameToDelete: string = ''
  orderIdToDelete: number = 0
  isCstUsed: boolean = false
  isItmUsed: boolean = false

  constructor(private router: Router) {}

  faEye = faEye
  faEdit = faEdit
  faTrash = faTrash
  faCheck = faCheck
  faTimes = faTimes
  faFileAlt = faFileAlt

  goDetailOrder(orderId: number): void {
    this.router.navigate(['/detail-order', orderId])
  }

  goAddOrder(): void {
    this.router.navigate(['/add-order'])
  }

  goEditOrder(orderId: number): void {
    this.router.navigate(['/edit-order', orderId])
  }

  ngOnInit(): void {
    this.getOrder()
  }

  async getOrder(page: number = 0): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/order?page=${page}&size=${this.pageSize}&customerName=${this.searchOrderCustomerName}&direction=${this.sortDirection}`
      )
      this.order = response?.data?.content
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1
      this.totalData = response.data.totalElements
    } catch (error) {
      console.error('Error fetching order:', error)
    }
  }

  openDeleteConfirmationModal(orderId: number, orderCode: string): void {
    this.orderIdToDelete = orderId
    this.orderNameToDelete = orderCode
    this.isModalOpen = true
  }

  closeDeleteConfirmationModal(): void {
    this.isModalOpen = false
    this.isCstUsed = false
    this.isItmUsed = false
  }

  async confirmDeleteOrder(): Promise<void> {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/order/${this.orderIdToDelete}`
      )

      this.getOrder(0)
    } catch (error) {
      console.error('Error while deleting order:', error)
      alert('Error while deleting order')
    } finally {
      this.closeDeleteConfirmationModal()
    }
  }

  onPageChange(page: number): void {
    this.getOrder(page - 1)
  }

  searchOrder(): void {
    this.getOrder()
  }

  sortOrder(): void {
    this.getOrder()
  }

  formatMoney(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  async downloadReport(): Promise<void> {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/order/report',
        {
          responseType: 'blob'
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'order_report.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error while downloading report:', error)
      alert('Error while downloading report')
    }
  }

  pageSizeOrder(): void {
    this.getOrder()
  }
}
