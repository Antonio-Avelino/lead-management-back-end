import { LeadStatus } from "../lead.enum";
  export class Lead  {
    private constructor(private readonly props: LeadProps) {}

    public static create(props: LeadProps) {
      const result = this.validate(props);
        if(!result.success) return result

        return {
            success: true,
            // value: new Lead(props),
            value: props,
            message:"Lead sucess"
        };
    }
  
    private static validate(props: LeadProps) {
        if (!props.name?.trim()) {
          return {
            success:false,
            message:"Name is required.",
            value:props
          };
        }
      
        if (!props.email?.trim()) {
            return {
                success:false,
                message:"Email is required.",
                value:props
              };
        }

        if(!this.isValidEmail(props.email)){
            return {
                success:false,
                message:"Invalid email",
               value:props
              };
          }
      
        if (!props.status?.trim()) {
            return {
                success:false,
                message:"Status is required.",

            value:props
              };
        }
        if (!this.isValidStatus(props.status)) {
          return {
            success: false,
            message: "Invalid status.",
            value: props,
          };
        }
    
        return {
            success:true,
            value:props,
           message:"Lead sucess"
          };
      }

    private static isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        return regex.test(email.trim());
      }
      private static isValidStatus(status: string): status is LeadStatus {
        return (Object.values(LeadStatus) as string[]).includes(status);
      }
  }
  
  
  export type LeadProps = {
    id?: string;
    name: string;
    email: string;
    status: string;
    createdAt?: Date;
  };
  