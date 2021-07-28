import IProduct from "../Store/Product/IProduct";

export default interface ICartGroup{
	id: number,
	product: IProduct;
	amount: number;
}