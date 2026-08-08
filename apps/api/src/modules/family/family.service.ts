import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Role } from '../../common/enums/role.enum';
import { FamilyRelationship, Gender, MaritalStatus, Prisma } from '@prisma/client';

export interface CreateFamilyMemberDto {
  familyId: string;
  name: string;
  tamilName?: string;
  preferredName?: string;
  placeOfBirth?: string;
  community?: string;
  relation: string;
  relationship?: FamilyRelationship;
  gender: Gender;
  dateOfBirth?: string;
  phone?: string;
  alternatePhone?: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
  isFamilyHead?: boolean;
  isLivingWithFamily?: boolean;
  parentGuardian?: string;
  schoolInstitution?: string;
  educationLevel?: string;
  courseDegree?: string;
  yearOfStudy?: string;
  occupation?: string;
  employer?: string;
  designation?: string;
  maritalStatus?: MaritalStatus;
  bloodGroup?: string;

  // Sacramental Details
  isBaptized?: boolean;
  baptismDate?: string;
  baptismParish?: string;
  baptismPlace?: string;
  baptismRegisterNo?: string;
  hasBaptismCertificate?: boolean;

  receivedFirstCommunion?: boolean;
  firstHolyCommunionDate?: string;
  firstHolyCommunionParish?: string;
  firstHolyCommunionRegisterNo?: string;

  isConfirmed?: boolean;
  confirmationDate?: string;
  confirmationParish?: string;
  confirmationRegisterNo?: string;

  isMarried?: boolean;
  marriageDate?: string;
  spouseName?: string;
  marriageParish?: string;
  marriageRegisterNo?: string;
  hasMarriageCertificate?: boolean;

  // Parish Involvement & Service
  anbiyamRole?: string;
  ministryInvolvement?: string;
  choirInvolvement?: string;
  isAltarServer?: boolean;
  catechismInvolvement?: string;
  isYouthMinistry?: boolean;
  otherParishService?: string;

  // Documents
  documents?: Record<string, unknown>[];
}

export function mapRelationToEnum(relation?: string): FamilyRelationship {
  if (!relation) return FamilyRelationship.OTHER;
  const upper = relation.toUpperCase();
  if (upper.includes('HEAD')) return FamilyRelationship.HEAD;
  if (upper.includes('SPOUSE')) return FamilyRelationship.SPOUSE;
  if (upper.includes('GRANDSON')) return FamilyRelationship.GRANDSON;
  if (upper.includes('GRANDDAUGHTER')) return FamilyRelationship.GRANDDAUGHTER;
  if (upper.includes('GRANDFATHER')) return FamilyRelationship.GRANDFATHER;
  if (upper.includes('GRANDMOTHER')) return FamilyRelationship.GRANDMOTHER;
  if (upper.includes('LAW') || upper.includes('IN-LAW')) return FamilyRelationship.IN_LAW;
  if (upper.includes('SON')) return FamilyRelationship.SON;
  if (upper.includes('DAUGHTER')) return FamilyRelationship.DAUGHTER;
  if (upper.includes('FATHER')) return FamilyRelationship.FATHER;
  if (upper.includes('MOTHER')) return FamilyRelationship.MOTHER;
  if (upper.includes('BROTHER')) return FamilyRelationship.BROTHER;
  if (upper.includes('SISTER')) return FamilyRelationship.SISTER;
  if (upper.includes('RELATIVE')) return FamilyRelationship.RELATIVE;
  return FamilyRelationship.OTHER;
}

export function isAdminRole(userRole?: Role): boolean {
  return (
    userRole === Role.SUPER_ADMIN ||
    userRole === Role.PARISH_PRIEST ||
    userRole === Role.ADMIN ||
    userRole === Role.OFFICE_STAFF
  );
}

export function sanitizeMemberForRole<T extends { community?: string | null }>(
  member: T,
  userRole?: Role,
): T {
  if (isAdminRole(userRole)) {
    return member;
  }
  const copy = { ...member };
  delete copy.community;
  return copy;
}

@Injectable()
export class FamilyService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllFamilies(userRole?: Role) {
    const families = await this.prisma.family.findMany({
      where: { isActive: true, deletedAt: null },
      include: { members: true },
    });
    if (!isAdminRole(userRole)) {
      return families.map((f) => ({
        ...f,
        members: (f.members || []).map((m) => sanitizeMemberForRole(m, userRole)),
      }));
    }
    return families;
  }

  async findFamilyById(id: string, userRole?: Role) {
    const family = await this.prisma.family.findUnique({
      where: { id },
      include: { members: { where: { deletedAt: null } } },
    });
    if (!family) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }
    if (!isAdminRole(userRole)) {
      return {
        ...family,
        members: (family.members || []).map((m) => sanitizeMemberForRole(m, userRole)),
      };
    }
    return family;
  }

  async findMembersByFamily(familyId: string, userRole?: Role) {
    const members = await this.prisma.familyMember.findMany({
      where: { familyId, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    if (!isAdminRole(userRole)) {
      return members.map((m) => sanitizeMemberForRole(m, userRole));
    }
    return members;
  }

  async createMember(dto: CreateFamilyMemberDto, userRole?: Role) {
    const isAdmin = isAdminRole(userRole);

    if (
      !isAdmin &&
      (dto.baptismRegisterNo ||
        dto.firstHolyCommunionRegisterNo ||
        dto.confirmationRegisterNo ||
        dto.marriageRegisterNo)
    ) {
      throw new ForbiddenException(
        'Only parish administrators can create or edit official canonical register numbers.',
      );
    }

    const baptismRegisterNo = isAdmin ? dto.baptismRegisterNo : null;
    const firstHolyCommunionRegisterNo = isAdmin ? dto.firstHolyCommunionRegisterNo : null;
    const confirmationRegisterNo = isAdmin ? dto.confirmationRegisterNo : null;
    const marriageRegisterNo = isAdmin ? dto.marriageRegisterNo : null;

    const relationshipEnum = dto.relationship || mapRelationToEnum(dto.relation);

    const created = await this.prisma.familyMember.create({
      data: {
        familyId: dto.familyId,
        name: dto.name,
        tamilName: dto.tamilName,
        preferredName: dto.preferredName,
        placeOfBirth: dto.placeOfBirth,
        community: dto.community,
        relation: dto.relation,
        relationship: relationshipEnum,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
        phone: dto.phone,
        alternatePhone: dto.alternatePhone,
        email: dto.email,
        address: dto.address,
        city: dto.city,
        pincode: dto.pincode,
        isFamilyHead: dto.isFamilyHead || false,
        isLivingWithFamily: dto.isLivingWithFamily ?? true,
        parentGuardian: dto.parentGuardian,
        schoolInstitution: dto.schoolInstitution,
        educationLevel: dto.educationLevel,
        courseDegree: dto.courseDegree,
        yearOfStudy: dto.yearOfStudy,
        occupation: dto.occupation,
        employer: dto.employer,
        designation: dto.designation,
        maritalStatus: dto.maritalStatus as MaritalStatus,
        bloodGroup: dto.bloodGroup,

        isBaptized: dto.isBaptized || false,
        baptismDate: dto.baptismDate ? new Date(dto.baptismDate) : null,
        baptismParish: dto.baptismParish,
        baptismPlace: dto.baptismPlace,
        baptismRegisterNo,
        hasBaptismCertificate: dto.hasBaptismCertificate || false,

        receivedFirstCommunion: dto.receivedFirstCommunion || false,
        firstHolyCommunionDate: dto.firstHolyCommunionDate
          ? new Date(dto.firstHolyCommunionDate)
          : null,
        firstHolyCommunionParish: dto.firstHolyCommunionParish,
        firstHolyCommunionRegisterNo,

        isConfirmed: dto.isConfirmed || false,
        confirmationDate: dto.confirmationDate ? new Date(dto.confirmationDate) : null,
        confirmationParish: dto.confirmationParish,
        confirmationRegisterNo,

        marriageDate: dto.marriageDate ? new Date(dto.marriageDate) : null,
        spouseName: dto.spouseName,
        marriageParish: dto.marriageParish,
        marriageRegisterNo,
        hasMarriageCertificate: dto.hasMarriageCertificate || false,

        anbiyamRole: dto.anbiyamRole,
        ministryInvolvement: dto.ministryInvolvement,
        choirInvolvement: dto.choirInvolvement,
        isAltarServer: dto.isAltarServer || false,
        catechismInvolvement: dto.catechismInvolvement,
        isYouthMinistry: dto.isYouthMinistry || false,
        otherParishService: dto.otherParishService,
        documents: (dto.documents as unknown as Prisma.InputJsonValue) || [],
      },
    });

    return sanitizeMemberForRole(created, userRole);
  }

  async updateMember(id: string, dto: Partial<CreateFamilyMemberDto>, userRole?: Role) {
    const existing = await this.prisma.familyMember.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    const isAdmin = isAdminRole(userRole);

    if (
      !isAdmin &&
      (dto.baptismRegisterNo !== undefined ||
        dto.firstHolyCommunionRegisterNo !== undefined ||
        dto.confirmationRegisterNo !== undefined ||
        dto.marriageRegisterNo !== undefined)
    ) {
      throw new ForbiddenException(
        'Only parish administrators can edit official canonical register numbers.',
      );
    }

    if (!isAdmin && dto.community !== undefined && dto.community !== existing.community) {
      throw new ForbiddenException(
        'Only parish administrators can view or modify the canonical Community record.',
      );
    }

    const updateData: Prisma.FamilyMemberUpdateInput = {};

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.tamilName !== undefined) updateData.tamilName = dto.tamilName;
    if (dto.preferredName !== undefined) updateData.preferredName = dto.preferredName;
    if (dto.placeOfBirth !== undefined) updateData.placeOfBirth = dto.placeOfBirth;
    if (isAdmin && dto.community !== undefined) updateData.community = dto.community;
    if (dto.relation !== undefined) {
      updateData.relation = dto.relation;
      updateData.relationship = dto.relationship || mapRelationToEnum(dto.relation);
    } else if (dto.relationship !== undefined) {
      updateData.relationship = dto.relationship as FamilyRelationship;
    }
    if (dto.gender !== undefined) updateData.gender = dto.gender;
    if (dto.dateOfBirth !== undefined)
      updateData.dateOfBirth = dto.dateOfBirth ? new Date(dto.dateOfBirth) : null;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.alternatePhone !== undefined) updateData.alternatePhone = dto.alternatePhone;
    if (dto.email !== undefined) updateData.email = dto.email;
    if (dto.address !== undefined) updateData.address = dto.address;
    if (dto.city !== undefined) updateData.city = dto.city;
    if (dto.pincode !== undefined) updateData.pincode = dto.pincode;
    if (dto.isFamilyHead !== undefined) updateData.isFamilyHead = dto.isFamilyHead;
    if (dto.isLivingWithFamily !== undefined)
      updateData.isLivingWithFamily = dto.isLivingWithFamily;
    if (dto.parentGuardian !== undefined) updateData.parentGuardian = dto.parentGuardian;
    if (dto.schoolInstitution !== undefined) updateData.schoolInstitution = dto.schoolInstitution;
    if (dto.educationLevel !== undefined) updateData.educationLevel = dto.educationLevel;
    if (dto.courseDegree !== undefined) updateData.courseDegree = dto.courseDegree;
    if (dto.yearOfStudy !== undefined) updateData.yearOfStudy = dto.yearOfStudy;
    if (dto.occupation !== undefined) updateData.occupation = dto.occupation;
    if (dto.employer !== undefined) updateData.employer = dto.employer;
    if (dto.designation !== undefined) updateData.designation = dto.designation;
    if (dto.maritalStatus !== undefined)
      updateData.maritalStatus = dto.maritalStatus as MaritalStatus;
    if (dto.bloodGroup !== undefined) updateData.bloodGroup = dto.bloodGroup;

    if (dto.isBaptized !== undefined) updateData.isBaptized = dto.isBaptized;
    if (dto.baptismDate !== undefined)
      updateData.baptismDate = dto.baptismDate ? new Date(dto.baptismDate) : null;
    if (dto.baptismParish !== undefined) updateData.baptismParish = dto.baptismParish;
    if (dto.baptismPlace !== undefined) updateData.baptismPlace = dto.baptismPlace;
    if (isAdmin && dto.baptismRegisterNo !== undefined)
      updateData.baptismRegisterNo = dto.baptismRegisterNo;
    if (dto.hasBaptismCertificate !== undefined)
      updateData.hasBaptismCertificate = dto.hasBaptismCertificate;

    if (dto.receivedFirstCommunion !== undefined)
      updateData.receivedFirstCommunion = dto.receivedFirstCommunion;
    if (dto.firstHolyCommunionDate !== undefined)
      updateData.firstHolyCommunionDate = dto.firstHolyCommunionDate
        ? new Date(dto.firstHolyCommunionDate)
        : null;
    if (dto.firstHolyCommunionParish !== undefined)
      updateData.firstHolyCommunionParish = dto.firstHolyCommunionParish;
    if (isAdmin && dto.firstHolyCommunionRegisterNo !== undefined)
      updateData.firstHolyCommunionRegisterNo = dto.firstHolyCommunionRegisterNo;

    if (dto.isConfirmed !== undefined) updateData.isConfirmed = dto.isConfirmed;
    if (dto.confirmationDate !== undefined)
      updateData.confirmationDate = dto.confirmationDate ? new Date(dto.confirmationDate) : null;
    if (dto.confirmationParish !== undefined)
      updateData.confirmationParish = dto.confirmationParish;
    if (isAdmin && dto.confirmationRegisterNo !== undefined)
      updateData.confirmationRegisterNo = dto.confirmationRegisterNo;

    if (dto.marriageDate !== undefined)
      updateData.marriageDate = dto.marriageDate ? new Date(dto.marriageDate) : null;
    if (dto.spouseName !== undefined) updateData.spouseName = dto.spouseName;
    if (dto.marriageParish !== undefined) updateData.marriageParish = dto.marriageParish;
    if (isAdmin && dto.marriageRegisterNo !== undefined)
      updateData.marriageRegisterNo = dto.marriageRegisterNo;
    if (dto.hasMarriageCertificate !== undefined)
      updateData.hasMarriageCertificate = dto.hasMarriageCertificate;

    if (dto.anbiyamRole !== undefined) updateData.anbiyamRole = dto.anbiyamRole;
    if (dto.ministryInvolvement !== undefined)
      updateData.ministryInvolvement = dto.ministryInvolvement;
    if (dto.choirInvolvement !== undefined) updateData.choirInvolvement = dto.choirInvolvement;
    if (dto.isAltarServer !== undefined) updateData.isAltarServer = dto.isAltarServer;
    if (dto.catechismInvolvement !== undefined)
      updateData.catechismInvolvement = dto.catechismInvolvement;
    if (dto.isYouthMinistry !== undefined) updateData.isYouthMinistry = dto.isYouthMinistry;
    if (dto.otherParishService !== undefined)
      updateData.otherParishService = dto.otherParishService;
    if (dto.documents !== undefined)
      updateData.documents = dto.documents as unknown as Prisma.InputJsonValue;

    const updated = await this.prisma.familyMember.update({
      where: { id },
      data: updateData,
    });

    return sanitizeMemberForRole(updated, userRole);
  }

  async deleteMember(id: string) {
    return this.prisma.familyMember.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }

  async saveDraft(familyId: string, draftData: Prisma.InputJsonValue) {
    return this.prisma.memberRegistrationDraft.upsert({
      where: { familyId },
      create: { familyId, draftData },
      update: { draftData },
    });
  }

  async getDraft(familyId: string) {
    const record = await this.prisma.memberRegistrationDraft.findUnique({
      where: { familyId },
    });
    return record?.draftData || null;
  }
}
