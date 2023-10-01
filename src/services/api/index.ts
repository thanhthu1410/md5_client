import userModules from "./modules/user";
import categoriesModules from "./modules/categories";
import productModules from "./modules/product";
import receiptModulels from "./modules/receipt";
import "./axios.instance";
export default {
    users: userModules,
    categories: categoriesModules,
    product: productModules,
    receipt: receiptModulels
}