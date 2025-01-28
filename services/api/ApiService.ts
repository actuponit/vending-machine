import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { useRuntimeConfig } from '#app'

// Define interfaces for better type safety
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface PaymentInitiateRequest {
  amount: string
  currency?: string
  description?: string
}

export interface PaymentInitiateResponse {
  data: {
    data: {
      checkout_url: string
    }
    message: string
    status: string
  }
  message: string
}

export class ApiService {
  private static instance: ApiService
  private readonly apiClient: AxiosInstance

  private constructor() {
    const config = useRuntimeConfig()
    this.apiClient = axios.create({
      baseURL: config.public.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add response interceptor for consistent error handling
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle global errors here
        console.error('API Error:', error)
        return Promise.reject(error)
      }
    )
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  // Generic request methods
  public async post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    const response: AxiosResponse = await this.apiClient.post(url, data)
    return {
      data: response.data,
      status: response.status
    }
  }

  public async get<T>(url: string): Promise<ApiResponse<T>> {
    const response: AxiosResponse = await this.apiClient.get(url)
    return {
      data: response.data,
      status: response.status
    }
  }

  // Specific business methods
  public async initiatePayment(
    paymentData: PaymentInitiateRequest
  ): Promise<ApiResponse<PaymentInitiateResponse>> {
    return this.post<PaymentInitiateResponse>('/payments/initialize', paymentData)
  }
}

// Export a convenient function to get the API service instance
export const getApiService = () => ApiService.getInstance() 