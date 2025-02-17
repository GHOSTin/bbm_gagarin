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
import { UserEntity } from '@/shared/models/UserEntity.ts';


export class AuthEntity {
    'accessToken': string;
    'user': UserEntity;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "accessToken",
            "baseName": "accessToken",
            "type": "string",
            "format": ""
        },
        {
            "name": "user",
            "baseName": "user",
            "type": "UserEntity",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return AuthEntity.attributeTypeMap;
    }

    public constructor() {
    }
}

