<template>
  <div>
    <h1>後台商品頁面</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">商品編碼</th>
          <th scope="col">商品名稱</th>
          <th scope="col">商品分類</th>
          <th scope="col">是否啟動</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.is_enabled }}</td>
          <td>
            <button type="button" @click="viewProduct(item)">查看詳情</button
            ><button type="button">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>查看商品詳情(樣式未來會在更改)</h2>
    {{ product }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: [],
      product: {}
    }
  },
  methods: {
    async getProducts() {
      try {
        const api = `${import.meta.env.VITE_BASE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/admin/products/all`
        const response = await axios.get(api)
        const { products } = response.data
        this.products = Object.values(products)
      } catch (error) {
        console.log(error?.response?.data?.message)
      }
    },
    viewProduct(product) {
      this.product = product
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>
