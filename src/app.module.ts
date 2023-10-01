import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get<string>('DB_URI')}`,
        dbName: configService.get<string>('DB_NAME'),
      }),
    }),
    UserModule,
    StoreModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    CommonModule,
  ],
})
export class AppModule {}
