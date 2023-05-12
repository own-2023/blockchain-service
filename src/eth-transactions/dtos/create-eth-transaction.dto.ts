
import { IsNotEmpty } from 'class-validator';
export class CreateEthTransactionDto {
    @IsNotEmpty()
    from: string;
  
    @IsNotEmpty()
    to: string;
  
    @IsNotEmpty()
    value: number;
}
