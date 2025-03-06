import { OmitType, PartialType } from '@nestjs/swagger';
import { ProfileEntity } from '@/profiles/entities/profile.entity';

export class UpdateProfileDto extends PartialType(OmitType(ProfileEntity, ['userId', 'groupId', 'phone'])) {}
