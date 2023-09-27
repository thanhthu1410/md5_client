import userModules from "./modules/user";
import categoriesModules from "./modules/categories";
import productModules from "./modules/product";
import "./axios.instance";
export default {
    users: userModules,
    categories: categoriesModules,
    product: productModules
}