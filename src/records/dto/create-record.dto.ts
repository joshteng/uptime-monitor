import { IsNumber, IsString } from "class-validator";

export class CreateRecordDto {
  @IsString()
  readonly serviceName: string;

  @IsNumber()
  readonly secondsBetweenHeartbeat: number;

  @IsNumber()
  readonly minutesBetweenAlerts: number;

  @IsNumber()
  readonly maxAlerts: number;
}
