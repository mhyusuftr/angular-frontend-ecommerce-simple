import { Component, OnInit } from '@angular/core'
import axios from 'axios'
import { Router } from '@angular/router'
import { faEye,faEdit,faTrash,faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-main-customer',
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.css']
})
export class MainCustomerComponent implements OnInit {

  customer: any[] = []
  totalPages: number = 0
  currentPage: number = 0
  pageSize: number = 5
  totalData: number = 0
  searchCustomerName: string = ''
  sortDirection: string = 'asc'
  isModalOpen: boolean = false
  customerNameToDelete: string = ''
  customerIdToDelete: number = 0
  isCstUsed: boolean = false;

  constructor(private router: Router) {}

  faEye = faEye
  faEdit = faEdit
  faTrash = faTrash
  faCheck = faCheck
  faTimes = faTimes

  goDetailCustomer(customerId: number): void {
    this.router.navigate(['/detail-customer', customerId])
  }

  goAddCustomer(): void {
    this.router.navigate(['/add-customer'])
  }

  goEditCustomer(customerId: number): void {
    this.router.navigate(['/edit-customer', customerId])
  }

  ngOnInit(): void {
    this.getCustomer()
  }

  async getCustomer(page: number = 0): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/customer?page=${page}&size=${this.pageSize}&customerName=${this.searchCustomerName}&direction=${this.sortDirection}`
      )
      this.customer = response.data.content
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1
      this.totalData = response.data.totalElements
    } catch (error) {
      console.error('Error fetching customer:', error)
    }
  }

  openDeleteConfirmationModal(customerId: number, customerName: string): void {

    this.checkUsedId("Customer", customerId);

    this.customerIdToDelete = customerId
    this.customerNameToDelete = customerName
    this.isModalOpen = true
  }

  closeDeleteConfirmationModal(): void {
    this.isModalOpen = false
    this.isCstUsed = false
  }

  async checkUsedId(module: string, id: number): Promise<void>{

    try {
      const response = await axios.get(
        `http://localhost:8080/api/order/checkUsedId?module=${module}&id=${id}`
      )
      this.isCstUsed = response.data
    } catch (error) {
      console.error("error checking used id : " + error)
    }

  }

  async confirmDeleteCustomer(): Promise<void> {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/customer/${this.customerIdToDelete}`
      )

      this.getCustomer(0)
    } catch (error) {
      console.error('Error while deleting customer:', error)
      alert('Error while deleting customer')
    } finally {
      this.closeDeleteConfirmationModal()
    }
  }

  onPageChange(page: number): void {
    this.getCustomer(page - 1)
  }

  searchCustomer(): void {
    this.getCustomer()
  }

  sortCustomer(): void {
    this.getCustomer()
  }

  pageSizeCustomer(): void {
    this.getCustomer()
  }
}
