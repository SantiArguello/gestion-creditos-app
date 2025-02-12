import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Loan } from './loans/loan.entity';
import { AuthModule } from './auth/auth.module'; // Importa el módulo de autenticación

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'gestion_creditos',
      entities: [User, Loan],
      synchronize: true,
    }),
    AuthModule, // Asegúrate de incluir AuthModule aquí
  ],
})
export class AppModule {}