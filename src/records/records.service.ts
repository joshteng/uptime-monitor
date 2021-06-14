import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'eslint/lib/rules/*';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>
  ) { }


  async createOrUpdate(createRecordDto: CreateRecordDto) {
    let record = await this._findBy(createRecordDto.serviceName)
    record = record ? record : new Record()

    record.serviceName = createRecordDto.serviceName
    record.secondsBetweenHeartbeat = createRecordDto.secondsBetweenHeartbeat
    record.minutesBetweenAlerts = createRecordDto.minutesBetweenAlerts
    record.maxAlerts = createRecordDto.maxAlerts

    return await this.recordRepository.save(record)
  }

  private async _findBy(serviceName: string) {
    return await this.recordRepository.findOne({
      where: {
        serviceName: serviceName
      }
    })
  }
}
