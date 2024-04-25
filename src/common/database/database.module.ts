import { Global, Module } from '@nestjs/common';
import dataSource from 'ormconfig';
import { DataSource } from 'typeorm';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        let db = await dataSource.initialize();
        return dataSource;
      }
    }
  ],
  exports: [DataSource]
})
export class DatabaseModule {}
