export interface DeliveryAddress {
	id: number;
	user_id: number;
	label: string;
	recipient_name: string;
	street_address: string;
	city: string;
	county: string;
	postal_code: string;
	country_code: string;
	phone_number: string;
	is_default: true;
}
