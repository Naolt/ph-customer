export type Product = {
  productId: number;
  productName: string;
  productBrand: string;
  productDescription: string;
  productManufacturedCountry: string | null;
  productCategoryId: number;
  productUserId: number;
  pharmacyId: number;
  pharmacyName: string;
  totalQuantity: number;
  inventoryId: number;
  inventoryBatchNo: string;
  inventorySellingPrice: number;
  inventoryIsExpired: boolean;
  inventoryVisibility: boolean;
  inventoryIsPrescriptionRequired: boolean;
  inventoryImage: string;
  inventoryDiscount: number;
};

export type Pharmacy = {
  pharmacy_id: number;
  email: string;
  pharmacy_name: string;
  pharmacy_phone_number: string | null;
  pharmacy_logo_url: string | null;
  business_license_number: string;
  business_address: string;
  latitude: number;
  longitude: number;
  owner_id: number;
  opening_hour: string;
  closing_hour: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
