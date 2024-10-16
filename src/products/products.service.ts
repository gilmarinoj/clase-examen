import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductsService {

  private product: ProductEntity[] = []
  create(createProductDto: CreateProductDto) {
    try {
      const product: ProductEntity = {
        ...createProductDto,
        isActive: true,
        id: this.product.length+1,
      }
      if( !product ){
        throw new BadRequestException("Product not create!");
      }
  
      this.product.push(product); 
      return product
    } catch (error) {
      throw new InternalServerErrorException("500 Server Error");
    }
  }

  findAll(paginationDto: PaginationDto) {
    try {
      const product = this.product.find(product => product.isActive === true)
      if(!product) throw new NotFoundException('No products')

      if(product) return this.product
    } catch (error) {
      throw new InternalServerErrorException('500 Server Error')
    }
  }

  findOne(id: number) {
    try{
      const product = this.product.find(product => product.id === id && product.isActive === true)
      if(!product) throw new NotFoundException('Product not found')
      return product;
    }catch(error){
      throw new InternalServerErrorException('500 Server Error')
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    try { 
      let productDB = this.product.find(product => product.id === id)
      
      this.product = this.product.map(product => {
        if(product.id === id){
          productDB = {
            ...productDB,
            ...updateProductDto
          }
          return productDB
        }
        return product;
      })
  }
  catch{
    throw new InternalServerErrorException('500 Server Error')
  }
}

  delete(id: number) {
    try {
      const productDB = this.product.find(product => product.id === id)
      if(!productDB) throw new NotFoundException('Product not found')
      this.product = this.product.filter(product => product.id !== id)

      return 'Producto Eliminad'
    } catch (error) {
      throw new InternalServerErrorException('500 Server Error')
    }
  }
}
