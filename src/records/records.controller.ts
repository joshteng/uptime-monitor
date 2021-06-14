import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.createOrUpdate(createRecordDto)
  }
}
