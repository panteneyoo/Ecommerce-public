import firestore from "./firestore";
import { getFakeProducts } from "./fakestore";

//CRUD
const seedProducts = async () => {
    const col = firestore.collection("product");

    const data = await col.get();

    if (data.size > 1) {
        return;
    }

    const productdata = await getFakeProducts();

    const promises = productdata.map(async (product) => {
        return await col.add(product);
    });

    const resolvedReferences = await Promise.all(promises);
}

export const getProducts = async () => {
    await seedProducts();

    const col = firestore.collection("product");

    const queryData = await col.get();

    const documents = queryData.docs;

    return documents.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getProduct = async (id) => {
    const data = await getProducts();
    const doc = data.find((item) => item.id === Number(id))

    return doc;
}

export const getCartProducts = async () => {

    const col = firestore.collection("cart");

    const queryData = await col.get();

    const documents = queryData.docs;

    return documents.map((doc) => ({ shopid: doc.id, ...doc.data() }));
};

export const addToCart = async (item, id,  qty) => {
    const col = firestore.collection("cart");

    if (id){
        const cart = await getCartProducts();
        const oldqty = cart.find((i) => i.shopid === id).quantity;
        await col.doc(id).update({ quantity: oldqty + qty });
    }else{
        if (qty > 0){
            item["quantity"] = Number(qty);
            await col.add(item);
        }
    }
}

export const updateQty = async(id, qty) => {
    const col = firestore.collection("cart").doc(id);
    if (qty === 0){
        await col.delete();
    }else{
        await col.update({ quantity: qty });
    }
}

export const deleteInCart = async(id) => {
    const col = firestore.collection("cart").doc(id);
    await col.delete();
}