/**
 * BBM Gagarin
 * API для электронного дневника
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProfileEntity } from '@/shared/models/ProfileEntity.ts';


export class UserEntity {
    'id': number;
    'createdAt': Date;
    'updatedAt': Date;
    'name'?: any;
    'email': string;
    'role': UserEntityRoleEnum;
    'profile'?: Partial<ProfileEntity>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number",
            "format": ""
        },
        {
            "name": "createdAt",
            "baseName": "createdAt",
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "updatedAt",
            "baseName": "updatedAt",
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "any",
            "format": ""
        },
        {
            "name": "email",
            "baseName": "email",
            "type": "string",
            "format": ""
        },
        {
            "name": "role",
            "baseName": "role",
            "type": "UserEntityRoleEnum",
            "format": ""
        },
        {
            "name": "profile",
            "baseName": "profile",
            "type": "UserEntityProfile",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return UserEntity.attributeTypeMap;
    }

    public constructor() {
    }
}


export type UserEntityRoleEnum = "USER" | "ADMIN" | "MODERATOR" ;

