const BASE_URL = "https://fakestoreapi.com";

export const getFakeProducts = async () => {
    const res = await fetch(`${BASE_URL}/products?limit=20`);
    const data = await res.json();
    return data;
}