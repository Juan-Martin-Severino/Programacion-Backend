class ProductManager {
    constructor() {
        this.products = []
    }

    getProductId = () => {
        const amount = this.products.length
        const productId = amount > 0 ? this.products[amount, amount - 1].id + 1 : 1
        return productId
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            id: this.getProductId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const duplicatedCode = (element) => element.code == product.code

        if (!this.products.some(duplicatedCode)) {
            this.products.push(product)
            console.log(`Producto agregado satisfactoriamente con Id "${product.id}"`);
        } else {
            console.log("Código duplicado. No se puede agregar el producto");
        }
    }

    getProducts = () => {
        console.log(this.products);
        return this.products
    }

    getProductById = (productId) => {
        const productFound = this.products.find((element) => element.id == productId)
        if (productFound) {
            console.log("Producto encontrado: ",productFound);
        } else {
            console.log("Producto no encontrado");
        }
    }
}

const producto = new ProductManager()

console.log("Se llama a “getProducts” recién creada la instancia, el cual devuelve un arreglo vacío:", producto.getProducts())

producto.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "Sin imagen",
    "abc123",
    25
)

producto.getProducts()

producto.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "Sin imagen",
    "abc123",
    25
)

producto.getProductById(2)
producto.getProductById(1)