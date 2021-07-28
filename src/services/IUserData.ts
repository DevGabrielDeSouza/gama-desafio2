import IProduct from "../components/Store/Product/IProduct";

interface IUserData {
	name: string;
	email: string;
	password: string;
	cart: IProduct[];
}

export default IUserData;