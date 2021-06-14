import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'eslint/lib/rules/*';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record';

@Injectable()
export class RecordsService {
  private readonly logger = new Logger(RecordsService.name)

  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>
  ) { }


  async createOrUpdate(createRecordDto: CreateRecordDto) {
    let record = await this._findBy(createRecordDto.serviceName)
    record = record ? record : new Record()

    record.serviceName = createRecordDto.serviceName
    record.secondsBetweenHeartbeat = createRecordDto.secondsBetweenHeartbeat
    record.secondsBetweenAlerts = createRecordDto.secondsBetweenAlerts
    record.maxAlertsPerDownTime = createRecordDto.maxAlertsPerDownTime
    record.numberOfAlerts = 0
    record.isActive = true
    record.updatedAt = String((new Date()).getTime())
    record.lastAlertAt = String(+record.updatedAt - (record.secondsBetweenAlerts * 1000))

    this.logger.debug(`---${record.serviceName} created!----`)

    return await this.recordRepository.save(record)
  }

  private async _findBy(serviceName: string) {
    return await this.recordRepository.findOne({
      where: {
        serviceName: serviceName
      }
    })
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  private async sendAlert() {
    this.logger.debug("Running alert cron")
    const now = new Date().getTime()

    const records = await this.recordRepository.find({
      where: {
        isActive: true
      }
    })

    for (const record of records) {
      const secondsFromLastUpdate = (now - +record.updatedAt) / 1000
      const secondsFromLastAlert = (now - +record.lastAlertAt) / 1000

      if (
        secondsFromLastUpdate > record.secondsBetweenHeartbeat &&
        secondsFromLastAlert > record.secondsBetweenAlerts
      ) {
        const msg = `-------${record.serviceName} has been down for ${secondsFromLastUpdate} seconds! ${secondsFromLastUpdate / 60} minutes------`
        this.logger.debug(msg)

        record.lastAlertAt = String(now)

        if (record.numberOfAlerts + 1 >= record.maxAlertsPerDownTime) {
          record.isActive = false
        } else {
          record.numberOfAlerts++
        }

        this.recordRepository.save(record)
      }
    }
  }
}
