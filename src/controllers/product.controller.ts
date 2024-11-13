import { Request, Response } from 'express';
import QueryString, { ParsedQs } from "qs";
// import Product from '../module/product.module'
import Product from '../module/product.module';
// const { search } = require('../routes/product');

const getAllProductsStatic = async (req: Request, res: Response) => {
  const search = 'ac';
  const products = await Product.find({ price: { $gte: 100, $lte: 125 } });
  res.status(200).json({ products: products, nbHits: products.length });
}

interface IQueryObj {
  featured?: boolean;
  company?: string;
  name?: QueryString.ParsedQs;
  sort?: string;
  select?: number;
  numericFilters?: string;
  field?: string
}

const getAllProducts = async (req: Request, res: Response) => {
  const { featured, company, name, sort, select, numericFilters } = req.query;
  const queryObject: IQueryObj = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company as string;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" }
  }

  if (numericFilters) {
    const operatorMap: {
      ">": string,
      ">=": string,
      "=": string,
      "<": string,
      "<=": string
    } = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte"
    }
    const reqEx = /\b(<=|>=|<|=|>)/g;
    let filters
    if (typeof numericFilters === "string") {
      filters = numericFilters.replace(reqEx, (match: string) => `-${operatorMap[match as keyof typeof operatorMap]}-`);
    }
    const options = ["price", "rating"];

    filters = filters!.split(",").forEach((item: string) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        (queryObject as any)[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  if (typeof sort === "string") {
    let sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (typeof select === 'string') {
    let selectList = select.split(",").join(" ");
    result = result.select(selectList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products: products, nbHits: products.length });
}

export { getAllProductsStatic, getAllProducts }