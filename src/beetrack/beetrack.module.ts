import { BeetrackService } from './beetrack.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [BeetrackService],
    exports: [BeetrackService]
})
export class BeetrackModule { }
