import { LeadProps } from '../domain/entity/lead';
import { LeadModel } from '../../../../app/model/lead.model';

export class LeadRepository {

  async create(lead: LeadProps): Promise<LeadProps> {
    const doc = await LeadModel.create({
      ...lead,
      status: lead.status as any, 
    });

    return {
      ...lead
    };
  }

  async findAll(
    filtro: any, 
    paginacao: { page?: number; limit?: number }
  ): Promise<PaginatedResult<LeadProps>> {
    const page = Math.max(1, Number(paginacao?.page) || 1);
    const limit = Math.max(1, Number(paginacao?.limit) || 10);
    const skip = (page - 1) * limit;

    const [total, docs] = await Promise.all([
      LeadModel.countDocuments(filtro || {}),
      LeadModel.find(filtro || {})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    const data: LeadProps[] = docs.map((doc) => ({
      id: doc._id, 
      name: doc.name,
      email: doc.email,
      status: doc.status as any,
      createdAt: doc.createdAt,
    }));

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findByEmail(email: string): Promise<LeadProps | null> {
    const doc = await LeadModel.findOne({ email: email.toLowerCase() });

    if (!doc) {
      return null;
    }

    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      status: doc.status as any,
      createdAt: doc.createdAt,
    };
  }
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}