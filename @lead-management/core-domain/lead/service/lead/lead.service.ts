import { Lead,LeadProps } from '../../domain/entity/lead';
import { LeadRepository } from '../../repository/lead.repository';
export class LeadService {
    public readonly leadRepository: LeadRepository;

    constructor() {
        this.leadRepository = new LeadRepository();
    }

    public async execute(leadDto: LeadProps) {

        const resultado = Lead.create(leadDto);
        if (!resultado.success) {
            return {
                success:false,
                message:resultado.message
            };
        }

    const lead =    await this.leadRepository.create(resultado.value) 

         return {
            success:true,
            message:resultado.message,
            data:lead
         };
    }



    public async query(filtro,paginacao) {
        const results = await this.leadRepository.findAll(filtro, paginacao);
        return results
    }

}
