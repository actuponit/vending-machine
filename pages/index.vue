<template>
    <div>
      <h2 class="text-3xl font-bold mb-8 text-center">Select an Item</h2>
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VendingItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            @select="selectItem"
          />
        </div>
      </UContainer>
        <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Confirm Purchase
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <div class="p-4">
          <img :src="items[0].image" :alt="items[0].name" class="w-full h-48 object-cover" />
          <h4 class="text-xl font-semibold mt-4">{{ items[0].name }}</h4>
          <p class="text-gray-600 dark:text-gray-400">Are u sure u want to buy this item</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-2xl font-bold text-primary">${{ items[0].price.toFixed(2) }}</span>
            <UButton color="primary" @click="handlePayment" :loading="isLoading" :disabled="isLoading" >Purchase</UButton>
          </div>
        </div>
      </UCard>
    </UModal>
    </div>
</template>
  
<script setup lang="ts">  
import chipsImg from '~/assets/images/chips.webp'
import mirindaImg from '~/assets/images/mirinda.png'
  const items = ref([
    {
      id: 1,
      name: 'Mirinda',
      description: 'Refreshing carbonated beverage',
      price: 100.00,
      image: mirindaImg,
    },
    {
      id: 2,
      name: 'Chips Bag',
      description: 'Crunchy potato chips',
      price: 50.00,
      image: chipsImg,
    },
  ]);

const isOpen = ref(false);
const selectedItem = ref(null);

const { initiatePayment } = usePayment()

const isLoading = ref(false)
const paymentStatus = ref<string | null>(null)
const paymentId = ref<string | null>(null)
const redirectUrl = ref<string | null>(null)

const selectItem = (item: any) => {
    console.log('Selected item:', item);
    selectedItem.value = item;
    isOpen.value = true;
};

const handlePayment = async () => {
  isLoading.value = true
  paymentStatus.value = null
  paymentId.value = null
  redirectUrl.value = null
  try {
    if (!selectedItem.value) {
      throw new Error('No item selected')
    }
    const response = await initiatePayment((selectedItem.value as { price: number }).price.toString())

    console.log(response.data.data);
    redirectUrl.value = response.data.data.data.checkout_url
    if (redirectUrl.value) {
      window.location.href = redirectUrl.value
    }
  } catch (error) {
    paymentStatus.value = 'Failed'
    console.error('Payment failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>