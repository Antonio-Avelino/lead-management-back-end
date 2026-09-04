"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const lead_enum_1 = require("../lead.enum");
class Lead {
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
        var _a, _b, _c;
        if (!((_a = props.name) === null || _a === void 0 ? void 0 : _a.trim())) {
            return {
                success: false,
                message: "Name is required.",
                value: props
            };
        }
        if (!((_b = props.email) === null || _b === void 0 ? void 0 : _b.trim())) {
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
        if (!((_c = props.status) === null || _c === void 0 ? void 0 : _c.trim())) {
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
