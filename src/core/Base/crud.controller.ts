import { Body, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';

import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { PublicPrivate } from '../decorator/public-private.decorator';
import { Public } from '../decorator/public.decorator';
import { ApiQueryInfo, QueryInfo } from '../decorator/query-info.decorator';
import { QueryInfoDto } from '../interface/query-info.dto';
import { CrudService } from './crud.service';

@ApiBearerAuth()
export class CrudController<T extends CrudService<any>> {
  private logger = new Logger(this.constructor.name);
  constructor(private service: T) {}

  @PublicPrivate()
  @Get()
  @ApiQueryInfo()
  async getAll(@QueryInfo() queryInfo: QueryInfoDto) {
    return await this.service.getList(queryInfo);
  }

  @Public()
  @ApiQueryInfo()
  @Get(':id')
  async getItem(@Param('id') id: string, @QueryInfo() queryInfo: QueryInfoDto) {
    queryInfo.where.id = id;
    return await this.service.getItem(queryInfo);
  }
  @ApiBearerAuth()
  @Post()
  async create(@Body() body: any) {
    return await this.service.create(body);
  }

  @ApiBearerAuth()
  @ApiQueryInfo()
  @Put('bulk-update')
  async bulkUpdate(@Body() body: any, @QueryInfo() queryInfo: QueryInfoDto) {
    return await this.service.bulkUpdate(body, queryInfo);
  }

  @ApiBearerAuth()
  // @ApiQueryInfo()
  @ApiBody({})
  @Put(':id')
  async updateItem(
    @Body() body: any,
    @Param('id') id: string,
    @QueryInfo() queryInfo: QueryInfoDto,
  ) {
    queryInfo.where.id = id;
    return await this.service.update(body, queryInfo);
  }

  @ApiBearerAuth()
  // @ApiQueryInfo()
  @Delete(':id')
  async deleteItem(
    @Param('id') id: string,
    @QueryInfo() queryInfo: QueryInfoDto,
  ) {
    queryInfo.where.id = id;
    return await this.service.delete(queryInfo);
  }

  async getModel() {
    return this.service._model;
  }
}
