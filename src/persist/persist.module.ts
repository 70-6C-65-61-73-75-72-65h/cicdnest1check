import { Global, Module } from '@nestjs/common';
import { PersistService } from './persist.service';

@Global()
@Module({
  providers: [PersistService],
  exports: [PersistService],
})
export class PersistModule {}
