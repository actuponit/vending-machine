import { getApiService, type PaymentInitiateResponse, type ApiResponse } from '~/services/api/ApiService'

export function usePayment() {
  const apiService = getApiService()

  const initiatePayment = async (amount: string) => {
    try {
      const response = await apiService.initiatePayment({
        amount
      })
      return response
    } catch (error) {
      console.error('Payment initiation failed:', error)
      throw error
    }
  }

  return {
    initiatePayment,
  }
} 