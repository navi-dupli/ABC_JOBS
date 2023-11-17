import { Controller, Get } from "@nestjs/common";
import { CheckingScheduleService } from "../monitoring-schedule/checking-schedule.service";

@Controller('health')
export class HealthController {
  constructor(private readonly service: CheckingScheduleService) {
  }

  @Get()
  healthCheck() {
    return this.service.healthCheckingJob();
  }

}
