import { PartialType } from '@nestjs/swagger';
import { CreateProfTestDto } from './create-prof-test.dto';

export class UpdateProfTestDto extends PartialType(CreateProfTestDto) {}
