<template>
    <div class="min-h-screen flex flex-col">
      <div class="p-4 flex justify-between items-center">
        <div>
          <h1 class="font-bold text-xl">Vending Machine</h1>
        </div>
        <div>
          <UButton
            to="/"
            variant="ghost"
            color="gray"
          >
            Home
          </UButton>
        </div>
      </div>
      <main class="flex-grow container mx-auto px-4 py-8">
        <slot />
      </main>
      <UModals />
      <div class="text-center py-4">
        <p>&copy; {{ new Date().getFullYear() }} Vending Machine Co.</p>
      </div>
    </div>
  </template>