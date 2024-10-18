import { 
    Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe 
  } from '@nestjs/common';
  import { ReservesDto } from './dto/reserves.dto';
  import { ReservesService } from './reserves.service';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  
  @ApiTags('Reserves')
  @Controller('reserves')
  export class ReservesController {
    constructor(private readonly reservesService: ReservesService) {}
  
    @Get()
    @ApiOperation({ summary: 'Retrieve all reserves' })
    @ApiResponse({ status: 200, description: 'List of all reserves' })
    findAll() {
      return this.reservesService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a reserve by ID' })
    @ApiParam({ name: 'id', example: '1', description: 'ID of the reserve' })
    @ApiResponse({ status: 200, description: 'Reserve found' })
    @ApiResponse({ status: 404, description: 'Reserve not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.reservesService.findOne(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Create a new reserve' })
    @ApiResponse({ status: 201, description: 'Reserve successfully created' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    create(@Body() createReserveDto: ReservesDto) {
      return this.reservesService.create(createReserveDto);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update a reserve by ID' })
    @ApiParam({ name: 'id', example: '1', description: 'ID of the reserve to update' })
    @ApiResponse({ status: 200, description: 'Reserve successfully updated' })
    @ApiResponse({ status: 404, description: 'Reserve not found' })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateReserveDto: Partial<ReservesDto>,
    ) {
      return this.reservesService.update(id, updateReserveDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a reserve by ID' })
    @ApiParam({ name: 'id', example: '1', description: 'ID of the reserve to delete' })
    @ApiResponse({ status: 200, description: 'Reserve successfully deleted' })
    @ApiResponse({ status: 404, description: 'Reserve not found' })
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.reservesService.delete(id);
    }
  }
  