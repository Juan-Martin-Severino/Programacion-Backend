const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path

    }


    fileExist() {
        return fs.existsSync(this.path)
    }

    async getProductId() {

        try {
            const amount = this.products.length
            const productId = amount > 0 ? this.products[amount, amount - 1].id + 1 : 1
            return productId

        } catch (error) {
            console.log(`No se pudo generar ID. Error: ${error.message}`)
        }

    }

    //Cargar productos desde archivo

    async loadProducts() {
        try {

            const contenido = await fs.promises.readFile(this.path, "utf-8")
            this.products = JSON.parse(contenido)

        } catch (error) {

            console.log(`No se pudo leer el archivo de productos. Error: ${error}`)
            this.products = []
            await fs.promises.writeFile(this.path, '[]')

        }
    }

    //Guardar productos en el archivo

    async saveProducts() {
        try {

            const data = JSON.stringify(this.products)
            await fs.promises.writeFile(this.path, data)

        } catch (error) {
            console.log(`No se pudo guardar el archivo. Error: ${error}`)
        }
    }

    async addProduct(product) {
        try {
            if (this.fileExist()) {
                //leer el archivo
                const contenido = await fs.promises.readFile(this.path, "utf-8")
                const products = JSON.parse(contenido)
                products.push(product)
                //reescribimos el archivo con el nuevo contenido
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
                console.log("producto agregado")
            } else {
                console.log("El archivo no existe")
                await fs.promises.writeFile(this.path, JSON.stringify([product], null, '\t'))
                console.log("producto creado")
            }

        } catch (error) {
            console.log(error.message);
            return undefined;
        }

    }




    async getProducts() {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(contenido);
            return products


        } catch (error) {
            console.log(`No se pudieron obtener los productos. Error: ${error.message}`)

        }
    }

    async getProductById(productId) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(contenido)

            const productFound = products.find((element) => element.id === productId)
            if (productFound) {
                console.log("Producto encontrado: ", productFound)
            } else {
                console.log(`Producto con ID ${productId} no encontrado`)
            }


        } catch (error) {
            console.log(`No se pudo obtener el producto. Error: ${error.message}`)
        }




    }

    async updateProduct(productId, datosActualizados) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(contenido)
            const productIndex = products.findIndex((product) => product.id === productId)
            if (productIndex === -1) {
                console.log(`Producto con Id: ${productId} no encontrado`);
                return;
            }

            if (datosActualizados.id) {
                console.log(`No se puede modificar el dato ID`)
            } else {
                const productoActualizado = { ...products[productIndex], ...datosActualizados }
                products[productIndex] = productoActualizado
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
                console.log(`Producto con Id: ${productId} actualizado`)

            }



        } catch (error) {
            console.log(`No se pudo actualizar el producto. Error: ${error.message}`)
        }


    }

    async deleteProduct(productId) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(contenido)

            const productIndex = products.findIndex((product) => product.id === productId)
            if (productIndex === -1) {
                console.log(`Producto con Id: ${productId} no encontrado`);
                return;
            }
            products.splice(productIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            console.log(`Producto con Id: ${productId} eliminado`)




        } catch (error) {
            console.log(`No se pudo eliminar el producto. Error: ${error.message}`)
        }

    }
}

//------------------ PROCESO DE TESTING ------------------

const pManager = new ProductManager("./productos.json")

const managerAsync = async () => {

    await pManager.loadProducts()

    console.log("Lista de Productos:", await pManager.getProducts())


    await pManager.addProduct({
        id: await pManager.getProductId(),
        title: "producto prueba",
        description: "Este es un producto de prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    })


    console.log("Lista de Productos:", await pManager.getProducts())

    await pManager.getProductById(3)

    await pManager.updateProduct(7, {title: 'producto actualizado', price: 400 })

    await pManager.deleteProduct(4)
    console.log("Lista de Productos actualizada:", await pManager.getProducts())

}


managerAsync()