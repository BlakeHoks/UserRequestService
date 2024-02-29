import { Inject, Injectable } from '@nestjs/common'
import { CreateRequestDto } from './dto/create-request.dto'
import { UpdateRequestDto } from './dto/update-request.dto'
import { PG_CONNECTION } from '../constants'
import { Request } from './entities/request.entity'

@Injectable()
export class RequestService {
  constructor(@Inject(PG_CONNECTION) private db: any) {}
  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const { rows } = await this.db.query(
      'INSERT INTO requests(request_type, description, author, date, status) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [
        createRequestDto.request_type,
        createRequestDto.description,
        createRequestDto.author,
        createRequestDto.date,
        'В очереди',
      ],
    )
    return rows
  }

  async findAll(): Promise<Request[]> {
    const { rows } = await this.db.query('SELECT * FROM requests ORDER BY id')
    return rows
  }

  async findOne(id: number): Promise<Request | null> {
    const { rows } = await this.db.query(
      'SELECT * FROM requests WHERE id = $1',
      [id],
    )
    return rows[0]
  }

  async update(
    id: number,
    updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    const { rows } = await this.db.query(
      'UPDATE requests SET request_type = $1, description = $2, author = $3, date = $4 WHERE id = $5',
      [
        updateRequestDto.request_type,
        updateRequestDto.description,
        updateRequestDto.author,
        updateRequestDto.date,
        id,
      ],
    )
    return rows[0]
  }

  async updateStatus(id: number, status: string): Promise<Request> {
    const { rows } = await this.db.query(
      'UPDATE requests SET status = $1 WHERE id = $2',
      [status, id],
    )
    return rows[0]
  }

  async remove(id: number) {
    return await this.db.query('DELETE FROM requests WHERE id = $1', [id])
  }
}
