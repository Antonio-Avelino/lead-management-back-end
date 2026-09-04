"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const lead_enum_1 = require("../lead.enum");
class Lead {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        const result = this.validate(props);
        if (!result.success)
            return result;
        return {
            success: true,
            // value: new Lead(props),
            value: props,
            message: "Lead sucess"
        };
    }
    static validate(props) {
        if (!props.name?.trim()) {
            return {
                success: false,
                message: "Name is required.",
                value: props
            };
        }
        if (!props.email?.trim()) {
            return {
                success: false,
                message: "Email is required.",
                value: props
            };
        }
        if (!this.isValidEmail(props.email)) {
            return {
                success: false,
                message: "Invalid email",
                value: props
            };
        }
        if (!props.status?.trim()) {
            return {
                success: false,
                message: "Status is required.",
                value: props
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
            success: true,
            value: props,
            message: "Lead sucess"
        };
    }
    static isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.trim());
    }
    static isValidStatus(status) {
        return Object.values(lead_enum_1.LeadStatus).includes(status);
    }
}
exports.Lead = Lead;
