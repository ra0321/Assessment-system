import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import { Score } from 'src/score/score.entity';
import { ScoreService } from 'src/score/score.service';
import { sha1 } from 'hash-wasm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly scoreService: ScoreService,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    // Create a FindOneOptions object with the id value
    const options: FindOneOptions<User> = {
      where: { id },
    };
    return this.usersRepository.findOne(options);
  }

  async remove(id: number): Promise<boolean> {
    // Check score is exist
    const scores: Score[] = await this.scoreService.findByUser(id);
    if (scores.length > 0) return false;

    await this.usersRepository.delete(id);
    return true;
  }

  async create(user: User): Promise<User> {
    if (user.email) {
      const userExist = await this.usersRepository.findOne({
        where: { email: user.email },
      });

      if (userExist) {
        return null;
      } else {
        user.password = await sha1(user.password);

        // first user will be the admin
        if ((await this.usersRepository.find()).length == 0) {
          user.isAdmin = true;
        }

        return this.usersRepository.save(user);
      }
    }

    return null;
  }

  async update(id: string, user: User) {
    if (user.password) user.password = await sha1(user.password);
    this.usersRepository.update(id, user);
  }

  async login(email: string, password: string): Promise<User> {
    // Create a FindOneOptions object with the id value
    password = await sha1(password);
    const options: FindOneOptions<User> = {
      where: { email, password },
    };
    return this.usersRepository.findOne(options);
  }

  getElapseTime(elapsedTime: number) {
    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    // Create an array to store the non-zero time units
    const timeUnits = [];

    // Add non-zero hours to the array
    if (hours > 0) {
      timeUnits.push(`${hours}h`);
    }

    // Add non-zero minutes to the array
    if (minutes > 0) {
      timeUnits.push(`${minutes}m`);
    }

    // Add non-zero seconds to the array
    if (seconds > 0) {
      timeUnits.push(`${seconds}s`);
    }

    // Join the time units array with a space separator
    return timeUnits.join(' ');
  }
}
