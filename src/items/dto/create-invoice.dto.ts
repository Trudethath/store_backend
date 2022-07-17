import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  models: string;

  @IsNotEmpty()
  shipping: number;

  @IsNotEmpty()
  payment: number;

  @IsNotEmpty()
  subtotal: number;

  @IsNotEmpty()
  vat: number;

  @IsNotEmpty()
  total: number;

  created_at: string;
  updated_at: string;
}
